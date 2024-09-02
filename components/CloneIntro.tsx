"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useCloneContext } from "@/context/CloneContext";

const CloneIntro = () => {
  const [formName, setFormName] = useState("");
  const [message, setMessage] = useState("You Can Only Clone Yourself");
  const { name, setName, cloneStep, setCloneStep } = useCloneContext();

  const validateName = (e: any) => {
    e.preventDefault();
    //check if both first and last name are entered
    const nameArray = formName.split(" ");
    if (nameArray.length > 1) {
      setName(formName);
      setCloneStep(2);
    } else {
      setMessage("Please Enter Both First and Last Name");
    }
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-2 w-full text-center">
      <Image
        src="/images/blank.png"
        width={300}
        height={300}
        alt="Clone Yourself"
      />
      <h1 className="text-3xl md:text-4xl mt-4">Step 1: Enter Your Name</h1>
      <p className="mt-4 text-xl text-center">{message}</p>
      <div className="flex flex-col w-full max-w-[350px] items-center justify-center ">
        <form onSubmit={validateName}>
          <input
            type="text"
            placeholder="Enter Your Full Name"
            className="rounded-full px-6 py-4 text-center text-[#333] mt-6 w-full"
            onChange={(e) => setFormName(e.target.value)}
          />
          {(formName && (
            <input
              type="submit"
              className="w-full text-lg md:text-xl bg-green-800 rounded-full px-6 py-4 min-w-[130px] mt-6"
              value="Next Step"
            />
          )) || (
            <input
              type="submit"
              className="w-full text-lg md:text-xl bg-slate-700 rounded-full px-6 py-4 min-w-[130px] mt-6 opacity-40"
              value="Next Step"
              disabled
            />
          )}
        </form>
        {/* <p>{cloneStep}</p> */}
      </div>
    </div>
  );
};

export default CloneIntro;
