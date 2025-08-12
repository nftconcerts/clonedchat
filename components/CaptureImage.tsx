import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Webcam from "react-webcam";
import { useRouter } from "next/navigation";
import { useCloneContext } from "@/context/CloneContext";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import makeid from "@/lib/makeid";

const CaptureImage = () => {
  const router = useRouter();
  const { name, image, setImage, setCloneStep, cloneid, setCloneId } =
    useCloneContext();
  const [cameraAccess, setCameraAccess] = useState<boolean>(false);
  const [microphoneAccess, setMicrophoneAccess] = useState<boolean>(false);
  const [permissionError, setPermissionError] = useState<string>("");
  const [countdown, setCountdown] = useState<number>(0);
  const [showFlash, setShowFlash] = useState<boolean>(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [imgUrl, setImgUrl] = useState<string>("");
  const webcamRef = useRef<Webcam>(null);

  useEffect(() => {
    if (!cloneid) {
      setCloneId(name + " - " + makeid(10));
    }
  }, [cloneid, setCloneId, name]);

  const requestPermissions = async () => {
    try {
      setPermissionError("");
      // Request both camera and microphone permissions
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      // Check which permissions were granted
      const tracks = stream.getTracks();
      tracks.forEach((track) => {
        if (track.kind === "video") {
          setCameraAccess(true);
        }
        if (track.kind === "audio") {
          setMicrophoneAccess(true);
        }
        // Stop the tracks after checking
        track.stop();
      });
    } catch (error: any) {
      console.error("Permission error:", error);
      if (error.name === "NotAllowedError") {
        setPermissionError(
          "Camera and microphone access was denied. Please enable them in your browser settings."
        );
      } else if (error.name === "NotFoundError") {
        setPermissionError("No camera or microphone found on your device.");
      } else {
        setPermissionError(
          "An error occurred while accessing your camera and microphone."
        );
      }
      setCameraAccess(false);
      setMicrophoneAccess(false);
    }
  };

  useEffect(() => {
    requestPermissions();
  }, []);

  const startCaptureProcess = () => {
    setCountdown(3);
    const interval = setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(interval);
          capture2();
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);
  };

  const capture2 = async () => {
    setShowFlash(true);
    setTimeout(() => setShowFlash(false), 200);

    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setCapturedImage(imageSrc);
      const fetchRes = await fetch(imageSrc);
      const blob = await fetchRes.blob();

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        console.error("Unable to get canvas context");
        return;
      }

      const img = new (window.Image as any)();
      img.onload = async () => {
        const size = Math.min(img.width, img.height);
        canvas.width = size;
        canvas.height = size;

        const startX = (img.width - size) / 2;
        const startY = (img.height - size) / 2;

        ctx.drawImage(img, startX, startY, size, size, 0, 0, size, size);

        canvas.toBlob(async (croppedBlob) => {
          if (!croppedBlob) {
            console.error("Failed to convert canvas to blob");
            return;
          }
          const file = new File([croppedBlob], "userImage.png", {
            type: "image/png",
          });
          setCapturedImage(URL.createObjectURL(croppedBlob));

          setTimeout(() => {
            const storageRef = ref(storage, `images/${cloneid}/${file.name}`);
            uploadBytes(storageRef, file)
              .then((snapshot) => {
                getDownloadURL(snapshot.ref).then((downloadURL) => {
                  setCloneId(cloneid);
                  console.log("File available at", downloadURL);
                  setImage(downloadURL);
                  setImgUrl(downloadURL);
                });
              })
              .catch((error) => {
                console.error(
                  "Error uploading file to Firebase Storage:",
                  error
                );
              });
          }, 1000);
        }, "image/png");
      };
      img.src = URL.createObjectURL(blob);
    }
  };

  const createClone = async () => {
    if (imgUrl === "") {
      console.error("No image captured");
      return;
    }

    const prompt =
      "Transform this person into a 2D cartoon character. Make sure you reflect the users features in the cartoon but make them look a few years younger and full of energy and life. Put a 10px white border around the character outline and have a black background. This is for sticker printing, so make sure the user can tell it is them and they are visible from a distance. ";

    const payload = {
      cloneid,
      imgurl: imgUrl,
      prompt,
    };

    try {
      const response = await fetch("/api/createClone", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Successfully created clone:", data);

      if (data?.image_url) {
        console.log("Edited image URL:", data.image_url);
        setImage(data.image_url);
      }
    } catch (error) {
      console.error("Failed to create clone:", error);
    }
    setCloneStep(3);
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-2 w-full text-center">
      {permissionError ? (
        <div className="flex flex-col items-center space-y-6">
          <h2 className="text-2xl text-red-500">Permission Error</h2>
          <p className="text-lg">{permissionError}</p>
          <div className="flex flex-col space-y-4 w-full max-w-[350px]">
            <button
              onClick={requestPermissions}
              className="w-full text-lg md:text-xl bg-blue-600 rounded-full px-6 py-4 hover:bg-blue-700"
            >
              Try Again
            </button>
            <button
              onClick={() => setCloneStep(0)}
              className="w-full text-lg md:text-xl bg-gray-600 rounded-full px-6 py-4 hover:bg-gray-700"
            >
              Go Home
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="relative flex items-center justify-center w-full">
            {showFlash && (
              <div className="absolute z-20 w-full max-w-[300px] h-full bg-white opacity-75"></div>
            )}
            {cameraAccess && !capturedImage && (
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={{ facingMode: "user" }}
                width={300}
                height={300}
                className="absolute z-0 object-cover aspect-square"
              />
            )}
            {capturedImage && (
              <img
                src={capturedImage}
                width={300}
                height={300}
                alt="Captured"
                className="absolute z-10 object-cover aspect-square"
              />
            )}

            <Image
              src="/images/blank_empty.png"
              width={300}
              height={300}
              alt="Clone Yourself"
              className="relative z-30"
            />
          </div>

          {(!capturedImage && (
            <>
              <h1 className="text-3xl md:text-4xl mt-4">
                Step 2: Capture Your Image
              </h1>
              <p className="mt-4 text-xl text-center">
                Align Your Face with the Outline
              </p>
            </>
          )) || (
            <h1 className="text-3xl md:text-4xl mt-4">
              Happy with your image?
            </h1>
          )}

          <div className="flex flex-col w-full max-w-[350px] items-center justify-center">
            {(capturedImage && (
              <>
                <button
                  className="w-full text-lg md:text-xl bg-green-800 rounded-full px-6 py-4 min-w-[130px] mt-6 cursor-pointer hover:bg-green-600"
                  onClick={createClone}
                >
                  Looks Good!
                </button>
                <button
                  className="w-full text-lg md:text-xl bg-slate-700 rounded-full px-6 py-4 min-w-[130px] mt-6"
                  onClick={() => setCapturedImage(null)}
                >
                  Retake Image
                </button>
              </>
            )) || (
              <button
                className="w-full text-lg md:text-xl bg-slate-700 rounded-full px-6 py-4 min-w-[130px] mt-6 disabled:opacity-70"
                onClick={startCaptureProcess}
                disabled={countdown > 0}
              >
                {countdown > 0 ? `Capturing in ${countdown}` : "Capture Image"}
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CaptureImage;
