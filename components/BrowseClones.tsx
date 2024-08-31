import React from "react";
import Image from "next/image";

const BrowseClones = () => {
  return (
    <div className="flex w-full max-w-[1400px] flex-wrap ">
      <div className="w-full md:w-1/3 p-2  ">
        <div className="flex bg-black/10 rounded-md hover:bg-black/20">
          <div className="w-1/2 flex justify-center p-2">
            <Image
              src="/images/jimmyclone.png"
              width={300}
              height={300}
              alt="JimmyGPT"
            />
          </div>
          <div className="flex flex-col w-full justify-center items-center">
            <h3 className="text-white text-2xl mb-4">Jimmy Dendrinos</h3>
            <ul>
              <li className="text-white">Music Festival Photographer</li>

              <li className="text-white">Developer + Creator</li>

              <li className="text-white"> </li>
            </ul>
            <button className="flex w-full max-w-[200px] bg-green-800 rounded-full px-6 py-4 mt-4 text-center justify-center">
              Chat with Jimmy
            </button>
            <p className="text-gray-600 text-md mt-3">@jimmygpt</p>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/3 p-2  ">
        <div className="flex bg-black/10 rounded-md hover:bg-black/20">
          <div className="w-1/2 flex justify-center p-2">
            <Image
              src="/images/sarahclone.png"
              width={300}
              height={300}
              alt="SarahGPT"
            />
          </div>
          <div className="flex flex-col w-full justify-center items-center">
            <h3 className="text-white text-2xl mb-4">Sarah Smith</h3>
            <ul>
              <li className="text-white">Real Estate Attorney</li>

              <li className="text-white">Amateur Investor</li>

              <li className="text-white"> </li>
            </ul>
            <button className="flex w-full max-w-[200px] bg-green-800 rounded-full px-6 py-4 mt-4 text-center justify-center">
              Chat with Sarah
            </button>
            <p className="text-gray-600 text-md mt-3">@ssmith</p>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/3 p-2  ">
        <div className="flex bg-black/10 rounded-md hover:bg-black/20">
          <div className="w-1/2 flex justify-center p-2">
            <Image
              src="/images/davidclone.png"
              width={300}
              height={300}
              alt="DavidGPT"
            />
          </div>
          <div className="flex flex-col w-full justify-center items-center">
            <h3 className="text-white text-2xl mb-4 ">David Myers</h3>

            <ul>
              <li className="text-white">Financial Advisor</li>

              <li className="text-white">Visited All 50 States</li>

              <li className="text-white"> </li>
            </ul>
            <button className="flex w-full max-w-[200px] bg-green-800 rounded-full px-6 py-4 mt-4 text-center justify-center">
              Chat with David
            </button>
            <p className="text-gray-600 text-md mt-3">@myersfinancial</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseClones;
