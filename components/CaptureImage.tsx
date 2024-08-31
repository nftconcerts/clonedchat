import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Webcam from "react-webcam";
import { useCloneContext } from "@/context/CloneContext";
import { storage } from "../firebase"; // Adjust the import path according to your setup
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import makeid from "@/lib/makeid";
import { set } from "firebase/database";

const CaptureImage = () => {
  const { name, image, setImage, setCloneStep, cloneid, setCloneId } =
    useCloneContext();
  const [cameraAccess, setCameraAccess] = useState<boolean>(true);
  const [countdown, setCountdown] = useState<number>(0);
  const [showFlash, setShowFlash] = useState<boolean>(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [imgUrl, setImgUrl] = useState<string>("");
  const webcamRef = useRef<Webcam>(null);

  useEffect(() => {
    if (!cloneid) {
      setCloneId(name + " - " + makeid(10));
    }
  }, []);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        stream.getTracks().forEach((track) => track.stop());
        setCameraAccess(true);
      })
      .catch(() => {
        setCameraAccess(false);
      });
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

  // const capture = async () => {
  //   setShowFlash(true);
  //   setTimeout(() => setShowFlash(false), 200); // Flash effect duration

  //   const imageSrc = webcamRef.current?.getScreenshot();
  //   if (imageSrc) {
  //     setCapturedImage(imageSrc); // Display the captured image

  //     // Convert the base64 string to a file
  //     const fetchRes = await fetch(imageSrc);
  //     const blob = await fetchRes.blob();
  //     const file = new File([blob], "userImage.png", { type: "image/png" });

  //     const cloneId = name + makeid(10); // Generate a random ID for the image

  //     // Proceed to upload and further steps after a brief moment
  //     setTimeout(() => {
  //       const storageRef = ref(storage, `images/${cloneId}/${file.name}`);
  //       uploadBytes(storageRef, file)
  //         .then((snapshot) => {
  //           getDownloadURL(snapshot.ref).then((downloadURL) => {
  //             setCloneId(cloneId); // Assuming you want to store the ID in your context
  //             console.log("File available at", downloadURL);
  //             setImage(downloadURL); // Assuming you want to store the URL in your context
  //           });
  //         })
  //         .catch((error) => {
  //           console.error("Error uploading file to Firebase Storage:", error);
  //         });
  //     }, 1000); // Adjust this delay as needed
  //   }
  // };

  const capture2 = async () => {
    setShowFlash(true);
    setTimeout(() => setShowFlash(false), 200); // Flash effect duration

    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setCapturedImage(imageSrc);
      // Convert the base64 string to a blob
      const fetchRes = await fetch(imageSrc);
      const blob = await fetchRes.blob();

      // Create an off-screen canvas
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        console.error("Unable to get canvas context");
        return;
      }

      const img = new (window.Image as any)();
      img.onload = async () => {
        // Determine the size for the square crop
        const size = Math.min(img.width, img.height);
        canvas.width = size;
        canvas.height = size;

        // Calculate the top left corner of the cropped image
        const startX = (img.width - size) / 2;
        const startY = (img.height - size) / 2;

        // Draw the image onto the canvas, cropping it to a square
        ctx.drawImage(img, startX, startY, size, size, 0, 0, size, size);

        // Convert the canvas to a blob
        canvas.toBlob(async (croppedBlob) => {
          if (!croppedBlob) {
            console.error("Failed to convert canvas to blob");
            return; // Exit if conversion fails
          }
          const file = new File([croppedBlob], "userImage.png", {
            type: "image/png",
          });
          setCapturedImage(URL.createObjectURL(croppedBlob)); // Display the cropped image
          // Generate a unique ID for the clone
          // Proceed to upload and further steps
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
          }, 1000); // Adjust delay as needed
        }, "image/png");
      };
      img.src = URL.createObjectURL(blob); // Create a URL for the blob and load the image
    }
  };

  const createClone = async () => {
    // Assuming `capturedImage` is the state holding your image URL
    // and `prompt` is your desired text for image editing.
    if (imgUrl === "") {
      console.error("No image captured");
      return;
    }

    // Assuming you want to proceed to the next step

    const prompt =
      "Transform this person into a 2D cartoon character. Make sure you reflect the users features in the cartoon but make them look a few years younger and full of energy and life. Put a 10px white border around the character outline and have a black background. This is for sticker printing, so make sure the user can tell it is them and they are visible from a distance. "; // Customize your prompt

    // Construct the request payload
    const payload = {
      cloneid,
      imgurl: imgUrl,
      prompt,
    };

    try {
      // Replace '/api/createClone' with your actual API route if different
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

      // Assuming the API returns the edited image information
      const data = await response.json();
      console.log("Successfully created clone:", data);

      // Handle the edited image here
      // For example, if you want to display the edited image URL
      if (data?.image_url) {
        console.log("Edited image URL:", data.image_url);
        setImage(data.image_url); // Assuming `setImage` updates the state to display the image
      }
    } catch (error) {
      console.error("Failed to create clone:", error);
    }
    setCloneStep(3);
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-2 w-full text-center">
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

        {/* Overlay Image */}
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
        <h1 className="text-3xl md:text-4xl mt-4">Happy with your image?</h1>
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
    </div>
  );
};

export default CaptureImage;
