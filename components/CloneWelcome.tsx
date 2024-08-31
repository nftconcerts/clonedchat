"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useCloneContext } from "@/context/CloneContext";
import Link from "next/link";

const CloneWelcome = () => {
  const { name, setName, cloneStep, setCloneStep } = useCloneContext();
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-2 w-full text-center">
      <h1 className="text-3xl md:text-4xl py-4">Welcome to Cloned Chat</h1>
      <Image
        src="/images/clonedarmy.png"
        width={700}
        height={700}
        alt="Clone Yourself"
      />

      <div className="flex flex-col w-full max-w-[350px] items-center justify-center ">
        <button
          className="w-full text-lg md:text-xl bg-green-800 rounded-full px-6 py-4 min-w-[130px] mt-6"
          onClick={() => setCloneStep(1)}
        >
          Create Your Own Clone
        </button>
        <Link href="/browse" className="w-full">
          {" "}
          <button
            className="w-full text-lg md:text-xl bg-gray-800 rounded-full px-6 py-4 min-w-[130px] mt-6"
            onClick={() => {
              setCloneStep(-1);
            }}
          >
            Chat with Clones
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CloneWelcome;
