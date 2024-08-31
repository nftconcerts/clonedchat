"use client";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import CloneIntro from "./CloneIntro";
import { useCloneContext } from "../context/CloneContext";
import Footer from "./Footer";
import CaptureImage from "./CaptureImage";
import HeaderStep from "./HeaderStep";
import CloneWelcome from "./CloneWelcome";
import CloneEmotion from "./CloneEmotion";

const CloneApp = () => {
  const { name, setName, cloneStep, setCloneStep } = useCloneContext();
  const [step, setStep] = useState(0);

  useEffect(() => {
    console.log("Clone Step: ", cloneStep);
    setStep(cloneStep);
  }, [cloneStep]);

  return (
    <>
      {step === 0 && (
        <>
          <Header />
          <CloneWelcome />
          <Footer />
        </>
      )}
      {step === 1 && (
        <>
          <HeaderStep />
          <CloneIntro />
          <Footer />
        </>
      )}
      {step === 2 && (
        <>
          <HeaderStep />
          <CaptureImage />
          <Footer />
        </>
      )}
      {step === 3 && (
        <>
          <HeaderStep />
          <CloneEmotion />
          <Footer />
        </>
      )}
      {step === 4 && (
        <>
          <HeaderStep />
          {/* <CloneInfo /> */}
          <Footer />
        </>
      )}
    </>
  );
};

export default CloneApp;
