"use client";
import { useAuth } from "@/context/AuthContext";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const LoginButtons = () => {
  const { user } = useAuth();
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-2 w-full text-center">
      <div className="flex flex-col items-center justify-center w-full max-w-[600px] p-4 bg-[#222]/50 rounded-xl mt-6 mb-6">
        <h1 className="text-4xl text-white mt-4">Log In to Cloned Chat</h1>
        <p className="text-white py-6">
          To access your account, please log in.
        </p>
        <button className="text-lg  bg-slate-700 rounded-full px-6 py-4 min-w-[300px] max-w-full hover:bg-[#222]">
          <div className="flex w-full justify-center items-center">
            Log In with Google{" "}
            <Image
              src="/images/google-logo.png"
              width={30}
              height={30}
              alt="Google Log In"
              className="ml-4"
            />
          </div>
        </button>
        <button className="mt-4 text-lg  bg-[#1877F2] rounded-full px-6 py-4 min-w-[300px] max-w-full hover:bg-[#0751b2]">
          <div className="flex w-full justify-center items-center">
            Log In with Facebook{" "}
            <Image
              src="/images/facebook-logo.png"
              width={30}
              height={30}
              alt="Facebook Log In"
              className="ml-2 brightness-0 invert"
            />
          </div>
        </button>
        <p className="text-slate-600 mt-6">
          Need help?{" "}
          <Link
            href="mailto:support@cloned.chat"
            className="underline hover:text-slate-200"
          >
            Contact Support
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginButtons;
