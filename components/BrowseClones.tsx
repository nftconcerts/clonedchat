"use client";
import React, { useState, useCallback } from "react";
import Image from "next/image";

interface Clone {
  cloneid: string;
  name: string;
  imageUrl: string;
  traits: string[];
  username: string;
}

interface CloneCardProps {
  clone: Clone;
}

const CloneCard: React.FC<CloneCardProps> = ({ clone }) => (
  <div className="w-full md:w-1/2 xl:w-1/3 p-2">
    <div className="flex flex-row bg-black/10 rounded-md hover:bg-black/20">
      <div className="w-1/2 flex justify-center p-2">
        <Image
          src={clone.imageUrl}
          width={300}
          height={300}
          alt={`${clone.name}GPT`}
          className="rounded-md"
        />
      </div>
      <div className="flex flex-col w-1/2 justify-center items-center p-4">
        <h3 className="text-white text-2xl mb-4">{clone.name}</h3>
        <ul className="mb-4">
          {clone.traits.map((trait, index) => (
            <li key={index} className="text-white text-center">
              {trait}
            </li>
          ))}
        </ul>
        <button className="w-full max-w-[200px] bg-green-800 rounded-full px-6 py-4 text-white text-center">
          Chat with {clone.name.split(" ")[0]}
        </button>
        <p className="text-gray-400 text-sm mt-3">@{clone.username}</p>
      </div>
    </div>
  </div>
);

interface BrowseCloneProps {
  initialClones: Clone[];
}

const BrowseClones: React.FC<BrowseCloneProps> = ({ initialClones }) => {
  const [clones, setClones] = useState<Clone[]>(initialClones);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const loadMoreClones = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    try {
      // Replace this with your actual API call
      const response = await fetch(
        `/api/clones?limit=9&offset=${clones.length}`
      );
      const newClones: Clone[] = await response.json();
      if (newClones.length > 0) {
        setClones(newClones);
      }
    } catch (error) {
      console.error("Failed to load more clones:", error);
    } finally {
      setLoading(false);
    }
  }, [clones.length, loading]);

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4">
      <div className="flex flex-wrap -mx-2">
        {clones.map((clone) => (
          <CloneCard key={clone.cloneid} clone={clone} />
        ))}
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={loadMoreClones}
          disabled={loading}
          className="bg-none text-[#aaa] px-6 py-2 rounded-full hover:text-white disabled:text-[#666]"
        >
          View More Clones
        </button>
      </div>
    </div>
  );
};

export default BrowseClones;
