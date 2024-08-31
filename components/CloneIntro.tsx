"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useCloneContext } from "@/context/CloneContext";

const CloneIntro = () => {
  const { name, setName, cloneStep, setCloneStep } = useCloneContext();
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-2 w-full text-center">
      <Image
        src="/images/blank.png"
        width={300}
        height={300}
        alt="Clone Yourself"
      />
      <h1 className="text-3xl md:text-4xl mt-4">Step 1: Enter Your Name</h1>
      <p className="mt-4 text-xl text-center">You Can Only Clone Yourself</p>
      <div className="flex flex-col w-full max-w-[350px] items-center justify-center ">
        <input
          type="text"
          placeholder="Enter Your Full Name"
          className="rounded-full px-6 py-4 text-center text-[#333] mt-6 w-full"
          onChange={(e) => setName(e.target.value)}
        />
        {(name && (
          <button
            className="w-full text-lg md:text-xl bg-green-800 rounded-full px-6 py-4 min-w-[130px] mt-6"
            onClick={() => setCloneStep(2)}
          >
            Next Step
          </button>
        )) || (
          <button
            className="w-full text-lg md:text-xl bg-slate-700 rounded-full px-6 py-4 min-w-[130px] mt-6 opacity-40"
            disabled
          >
            {" "}
            Next Step
          </button>
        )}
        {/* <p>{cloneStep}</p> */}
      </div>
    </div>
  );
};

export default CloneIntro;
