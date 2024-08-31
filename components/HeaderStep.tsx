import React from "react";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/solid";
import { useCloneContext } from "../context/CloneContext";

const HeaderStep = () => {
  const { cloneStep, setCloneStep } = useCloneContext();
  return (
    <div className="flex w-full justify-between p-2 md:px-6 md:py-4">
      <div className="w-1/2 flex justify-start pr-2">
        <button className="text-lg  border-white border-[3px] rounded-full w-full md:w-fit px-6 py-2 min-w-[130px] hover:bg-[#222]">
          <div
            className="flex w-full justify-center items-center"
            onClick={() => setCloneStep(cloneStep - 1)}
          >
            <ChevronLeftIcon className="w-4 h-4 mr-4" /> Back
          </div>
        </button>
      </div>
    </div>
  );
};

export default HeaderStep;
