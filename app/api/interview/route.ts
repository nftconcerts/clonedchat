import { NextRequest, NextResponse } from "next/server";
import WebSocket from "ws";

interface QueueItem {
  resolve: (value: any) => void;
  reject: (reason?: any) => void;
}

// Persistent WebSocket connection and response queue
let openaiSocket: WebSocket | null = null;
let connecting = false;
let clientResponseQueue: QueueItem[] = [];

// Wait for WebSocket to open before sending a message
const waitForOpenConnection = (socket: WebSocket): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (socket.readyState === WebSocket.OPEN) {
      return resolve();
    }

    const timeout = setTimeout(() => {
      reject(new Error("WebSocket connection timeout"));
    }, 10000);

    socket.on("open", () => {
      clearTimeout(timeout);
      resolve();
    });

    socket.on("error", (error) => {
      clearTimeout(timeout);
      reject(error);
    });
  });
};

// Send a message over WebSocket with connection handling
const sendMessage = async (
  socket: WebSocket,
  message: object
): Promise<void> => {
  await waitForOpenConnection(socket);
  socket.send(JSON.stringify(message));
};

// Initialize the WebSocket connection
const initializeWebSocket = () => {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is not configured");
  }

  const url =
    "wss://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview-2024-10-01";

  openaiSocket = new WebSocket(url, {
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "OpenAI-Beta": "realtime=v1",
    },
    perMessageDeflate: false, // Disable compression to avoid buffer-util issues
  });

  openaiSocket.on("open", () => {
    console.log("WebSocket connected");
  });

  openaiSocket.on("message", (data) => {
    console.log("Message received:", data.toString());
  });

  openaiSocket.on("close", (code, reason) => {
    console.log("WebSocket closed:", code, reason);
    openaiSocket = null;
  });

  openaiSocket.on("error", (error) => {
    console.error("WebSocket error:", error);
  });
};

// Ensure the WebSocket connection is active
const ensureWebSocketConnection = async (): Promise<void> => {
  if (openaiSocket && openaiSocket.readyState === WebSocket.OPEN) return;
  if (connecting) return;

  connecting = true;

  try {
    initializeWebSocket();
    await waitForOpenConnection(openaiSocket!);
  } finally {
    connecting = false;
  }
};

export async function POST(req: NextRequest) {
  try {
    const { action, data } = await req.json();

    if (!action || !data) {
      return NextResponse.json(
        { success: false, error: "Missing action or data" },
        { status: 400 }
      );
    }

    await ensureWebSocketConnection();

    if (action === "askQuestion" && data?.question) {
      const messageEvent = {
        type: "conversation.item.create",
        item: {
          type: "message",
          role: "user",
          content: [
            {
              type: "input_text",
              text: data.question,
            },
          ],
        },
      };

      const responseEvent = {
        type: "response.create",
        response: {
          modalities: ["text", "audio"],
        },
      };

      await sendMessage(openaiSocket!, messageEvent);
      await sendMessage(openaiSocket!, responseEvent);

      const response = await Promise.race([
        new Promise((resolve, reject) => {
          clientResponseQueue.push({ resolve, reject });
        }),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Response timeout")), 30000)
        ),
      ]);

      return NextResponse.json({ success: true, response });
    }

    return NextResponse.json(
      { success: false, error: "Invalid action" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error in interview API:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 }
    );
  }
}
