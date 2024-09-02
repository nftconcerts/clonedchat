import React from "react";
import { CloneProvider } from "@/context/CloneContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BrowseClones from "@/components/BrowseClones";
import { initialClones, secondaryClones } from "@/lib/initialClones";
const page = () => {
  return (
    <main className="flex w-full min-h-screen flex-col items-center justify-between bg-[#6e199a] ">
      <CloneProvider>
        <Header />
        <div className="flex flex-1 flex-col items-center justify-center w-full text-center">
          <BrowseClones initialClones={initialClones} />
        </div>
        <Footer />
      </CloneProvider>
    </main>
  );
};

export default page;
