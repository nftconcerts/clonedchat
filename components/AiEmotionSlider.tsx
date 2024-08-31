import React from "react";

type Props = {
  emotionName: string;
  emotionLight: string;
  emotionHeavy: string;
  emotionNum: string;
  setEmotion: (value: string) => void;
};
function AiEmotionSlider({
  emotionName,
  emotionLight,
  emotionHeavy,
  emotionNum,
  setEmotion,
}: Props) {
  return (
    <div className="sm:mt-4 flex flex-col mb-1 text-center">
      <div className="flex w-full justify-between -mb-2">
        {(parseInt(emotionNum) < 3 && (
          <div className="mt-4 opacity-80">{emotionLight}</div>
        )) || <div className="mt-4 opacity-20">{emotionLight}</div>}

        {(parseInt(emotionNum) > 3 && (
          <div className="mt-4 opacity-80">{emotionHeavy}</div>
        )) || <div className="mt-4 opacity-20">{emotionHeavy}</div>}
      </div>
      <label className="-mt-12 mb-10 sm:-mt-4 font-bold text-lg flex-1 sm:mb-2">
        {emotionName}
      </label>
      <input
        type="range"
        min="1"
        max="5"
        step="1"
        onChange={(e) => {
          setEmotion(e.target.value);
        }}
        value={emotionNum}
        className="mb-10 sm:mb-0 "
      />
    </div>
  );
}

export default AiEmotionSlider;
