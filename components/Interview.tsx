import React, { useState, useEffect } from "react";

const Interview = () => {
  const [questionIndex, setQuestionIndex] = useState(-1); // Start at -1 for welcome message
  const [response, setResponse] = useState<string | null>(null);
  const [isWelcomed, setIsWelcomed] = useState(false);
  const [transcription, setTranscription] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "speaking" | "listening">(
    "idle"
  );

  const questions = [
    "What's your go-to fun fact when introducing yourself?",
    "What's something people often say is unique about you?",
    "What's something you could talk about for hours?",
  ];

  const welcomeMessage =
    "Welcome to your interview! First, please make sure your volume is turned up and your microphone is enabled. Click 'Start Interview' when you're ready to begin.";

  useEffect(() => {
    // Play welcome message when component mounts
    if (!isWelcomed) {
      playWelcomeMessage();
    }
  }, []);

  const playWelcomeMessage = async () => {
    try {
      setStatus("speaking"); // AI is speaking
      const res = await fetch("/api/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "askQuestion",
          data: { question: welcomeMessage },
        }),
      });

      if (res.ok) {
        const result = await res.json();
        setResponse(result.response);
        if (result.response?.text) {
          setTranscription(result.response.text);
        }
      } else {
        console.error("Failed to play welcome message:", await res.json());
      }
    } catch (error) {
      console.error("Error playing welcome message:", error);
    } finally {
      setStatus("listening"); // Transition to listening
    }
  };

  const startInterview = () => {
    setIsWelcomed(true);
    setQuestionIndex(0);
    setResponse(null);
    setTranscription("");
    setStatus("idle");
  };

  const askQuestion = async () => {
    const question = questions[questionIndex];

    try {
      setStatus("speaking"); // AI is speaking
      const res = await fetch("/api/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "askQuestion", data: { question } }),
      });

      if (res.ok) {
        const result = await res.json();
        setResponse(result.response);
        if (result.response?.text) {
          setTranscription(result.response.text);
        }
        setQuestionIndex((prev) => prev + 1);
      } else {
        console.error("Failed to send question:", await res.json());
      }
    } catch (error) {
      console.error("Error asking question:", error);
    } finally {
      setStatus("listening"); // Transition to listening
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="max-w-2xl w-full space-y-8 text-center">
        {!isWelcomed ? (
          // Welcome Screen
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Welcome to Your Interview</h1>
            <div className="bg-blue-50 p-6 rounded-lg shadow-sm">
              <p className="text-lg mb-4 text-black">{welcomeMessage}</p>
              {transcription && (
                <div className="mt-4 p-4 bg-white rounded-lg">
                  <p className="text-gray-700">{transcription}</p>
                </div>
              )}
            </div>
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={() => playWelcomeMessage()}
                className="px-6 py-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
              >
                🔊 Replay Welcome
              </button>
              <button
                onClick={startInterview}
                className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
              >
                Start Interview
              </button>
            </div>
          </div>
        ) : (
          // Interview Questions
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">
              {questionIndex < questions.length
                ? questions[questionIndex]
                : "Interview Complete!"}
            </h1>

            {transcription && (
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-gray-700">{transcription}</p>
              </div>
            )}

            {status === "speaking" && (
              <div className="text-lg font-medium text-blue-600">
                AI is speaking...
              </div>
            )}

            {status === "listening" && (
              <div className="text-lg font-medium text-green-600">
                Listening for your response...
              </div>
            )}

            {questionIndex < questions.length && (
              <button
                onClick={askQuestion}
                className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
              >
                Ask Next Question
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Interview;
