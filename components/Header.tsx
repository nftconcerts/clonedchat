"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { UsersIcon, UserIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const Header = () => {
  const pathname = usePathname(); // Use the useRouter hook
  const { user } = useAuth();
  const [showMyAccount, setShowMyAccount] = useState(false);

  useEffect(() => {
    // Update the state based on the current pathname
    setShowMyAccount(pathname !== "/login");
  }, [pathname]); // React to changes in pathname

  return (
    <div className="flex w-full justify-between p-2 md:px-6 md:py-4">
      <div className="w-1/2 flex justify-start pr-2">
        <Link href="/">
          <h1 className="text-xl md:text-2xl border-white border-[3px] rounded-full px-6 py-4 w-full md:w-fit text-center min-w-[130px] hover:bg-[#222]/20 cursor-pointer flex justify-center items-center">
            cloned.chat
          </h1>
        </Link>
      </div>
      <div className="w-1/2 flex justify-end pl-2">
        {(showMyAccount && (
          <>
            {user ? (
              <Link href="/">
                <button className="text-lg md:text-2xl border-slate-700 border-[3px] bg-slate-700 rounded-full px-6 py-4 min-w-[130px] hover:bg-[#222] hover:border-[#222]">
                  <div className="flex w-full justify-center items-center">
                    Your Account <UsersIcon className="w-6 h-6 ml-4" />
                  </div>
                </button>
              </Link>
            ) : (
              <Link href="/login">
                <button className="text-lg md:text-2xl bg-slate-700 border-slate-700 border-[3px]  rounded-full w-full md:w-fit px-6 py-4 min-w-[130px] hover:bg-[#222] hover:border-[#222]">
                  <div className="flex w-full justify-center items-center">
                    Log In <UserIcon className="w-6 h-6 ml-4" />
                  </div>
                </button>
              </Link>
            )}
          </>
        )) || (
          <Link href="/browse">
            <button className="text-lg md:text-2xl bg-slate-700 rounded-full px-6 py-4 min-w-[130px] hover:bg-[#222]">
              <div className="flex w-full justify-center items-center">
                Chat with Clones <UsersIcon className="w-6 h-6 ml-4" />
              </div>
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
