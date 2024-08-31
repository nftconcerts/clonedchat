"use client";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import {
  ChevronDoubleRightIcon,
  ChevronDoubleLeftIcon,
  ShareIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { useCloneContext } from "@/context/CloneContext";

const Footer = () => {
  const { cloneStep, setCloneStep } = useCloneContext();
  const [showIcons, setShowIcons] = useState(false);
  const share = async () => {
    const shareData = {
      title: "Cloned Chat",
      url: `https://cloned.chat`,
      text: `Check out cloned.chat - Create your own clone!`,
      image: "/images/clone_blank.png",
    };
    if (navigator["share"]) {
      try {
        await navigator.share(shareData);
        toast.success("Shared!");
      } catch (error) {
        // Handle the error here (e.g., user cancelled the share)
        console.error("Error sharing:", error);
        // Optionally show a user-friendly message or toast
        toast.error("Share cancelled or failed.");
      }
    } else {
      //copy to clipboard
      navigator.clipboard.writeText("https://larrytheelf.com");
      toast.success("Share URL Copied to Clipboard!");
    }
  };

  return (
    <div className="flex w-full flex-col">
      <div className="flex w-full justify-between p-2 md:px-6 md:py-4">
        <button
          className={`text-lg md:text-2xl   rounded-full px-6 py-4 min-w-[130px] ${
            (showIcons && "w-full sm:w-auto bg-[#111]") ||
            "bg-[#222] hover:bg-[#111]"
          } ${cloneStep > 0 && "opacity-20 hover:opacity-100"}`}
          onClick={() => {
            if (!showIcons) {
              setShowIcons(true);
            }
          }}
        >
          {(!showIcons && (
            <div className="flex w-full justify-center items-center">
              Follow <ChevronDoubleRightIcon className="h-6 w-6 ml-4" />
            </div>
          )) || (
            <div className="flex w-full justify-evenly space-x-4">
              <Link
                href="https://www.twitter.com/clonedchat/"
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  src="/images/twitter-logo-white.png"
                  width={30}
                  height={30}
                  alt="Twitter"
                  className="cursor-pointer hover:opacity-60"
                />
              </Link>
              <Link
                href="https://www.instagram.com/clonedchat/"
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  src="/images/instagram-logo.png"
                  width={30}
                  height={30}
                  alt="Instagram"
                  className="cursor-pointer hover:opacity-60"
                />
              </Link>
              <Link
                href="https://www.facebook.com/clonedchat/"
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  src="/images/facebook-logo.png"
                  width={30}
                  height={30}
                  alt="Facebook"
                  className="filter brightness-0 invert cursor-pointer hover:opacity-60"
                />
              </Link>
              <Image
                src="/images/tiktok-logo.png"
                width={30}
                height={30}
                alt="TikTok"
                className="cursor-pointer hover:opacity-60"
              />
              <ChevronDoubleLeftIcon
                className="h-6 w-6 ml-4 cursor-pointer hover:opacity-60"
                onClick={() => {
                  setShowIcons(false);
                }}
              />
            </div>
          )}
        </button>
        <div
          className={`${
            (showIcons && "hidden sm:flex") || "flex"
          }  items-center space-x-4`}
        >
          <button
            className={`text-lg md:text-2xl bg-[#222] rounded-full px-6 py-4 min-w-[130px] hover:bg-[#111] ${
              cloneStep > 0 && "opacity-20 hover:opacity-100"
            }`}
            onClick={share}
          >
            <div className="flex w-full justify-center items-center">
              Share
              <ShareIcon className="h-6 w-6 ml-4" />
            </div>
          </button>
        </div>
      </div>
      <div className="w-full pb-2 text-center text-[#aaa] md:mt-[-30px]">
        <p>© 2024 Sheep LLC. All Rights Reserved</p>
      </div>
    </div>
  );
};

export default Footer;
