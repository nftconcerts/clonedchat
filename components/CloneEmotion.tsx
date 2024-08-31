import React, { useState } from "react";
import AiEmotionSlider from "./AiEmotionSlider";
import { useCloneContext } from "../context/CloneContext";

const CloneEmotion = () => {
  const [state, setState] = useState({
    tempEmpathy: "3",
    tempHumor: "3",
    tempAssertiveness: "3",
    tempIntelligence: "3",
    tempOptimism: "3",
  });
  const { setCloneStep } = useCloneContext();
  return (
    <div className="w-full max-w-[500px] text-center flex flex-col items-center ">
      <h1 className="text-3xl md:text-4xl ">Step 3: Set Your Personality</h1>
      <p className="mt-4 text-xl text-center mb-8 md:mb-2">
        Adjust the Sliders to Your Preference
      </p>
      <div className="w-full">
        <AiEmotionSlider
          emotionName="Empathy"
          emotionLight="Emotionless"
          emotionHeavy="Empathetic"
          emotionNum={state.tempEmpathy}
          setEmotion={(input: string) => {
            setState((prevState) => ({
              ...prevState,
              tempEmpathy: input,
            }));
          }}
        />
        <AiEmotionSlider
          emotionName="Humor"
          emotionLight="Serious"
          emotionHeavy="Comedian"
          emotionNum={state.tempHumor}
          setEmotion={(input: string) => {
            setState((prevState) => ({ ...prevState, tempHumor: input }));
          }}
        />
        <AiEmotionSlider
          emotionName="Assertiveness"
          emotionLight="Submissive"
          emotionHeavy="Dominant"
          emotionNum={state.tempAssertiveness}
          setEmotion={(input: string) => {
            setState((prevState) => ({
              ...prevState,
              tempAssertiveness: input,
            }));
          }}
        />
        <AiEmotionSlider
          emotionName="Intelligence"
          emotionLight="Dumb"
          emotionHeavy="Genius"
          emotionNum={state.tempIntelligence}
          setEmotion={(input: string) => {
            setState((prevState) => ({
              ...prevState,
              tempIntelligence: input,
            }));
          }}
        />
        <AiEmotionSlider
          emotionName="Optimism"
          emotionLight="Pessimist"
          emotionHeavy="Optimist"
          emotionNum={state.tempOptimism}
          setEmotion={(input: string) => {
            setState((prevState) => ({
              ...prevState,
              tempOptimism: input,
            }));
          }}
        />
      </div>
      <div className="flex flex-col w-full max-w-[350px] items-center justify-center mt-6 ">
        <button
          className="w-full text-lg md:text-xl bg-green-800 rounded-full px-6 py-4 min-w-[130px] mt-6 cursor-pointer hover:bg-green-600"
          onClick={() => setCloneStep(4)}
        >
          Looks Good!
        </button>
      </div>
    </div>
  );
};

export default CloneEmotion;
