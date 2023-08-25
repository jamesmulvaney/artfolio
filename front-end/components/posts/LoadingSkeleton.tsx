import React from "react";
import LoadingSkeletonReply from "./LoadingSkeletonReply";

type LoadingSkeletonProps = {};

function LoadingSkeleton({}: LoadingSkeletonProps) {
  return (
    <div className="flex justify-center sm:mt-5">
      <div className="container">
        {/* Post Section */}
        <div className="w-full rounded dark:bg-zinc-700 shadow-sm py-3 mt-5 sm:mt-0">
          <div className="flex flex-row justify-between items-center px-5 pb-3 border-b border-zinc-300/50 dark:border-white/20">
            <div className="flex flex-row space-x-2 items-center">
              {/* Avatar */}
              <div className="dark:bg-zinc-800 w-16 h-16 rounded-full animate-pulse" />
              <div className="flex flex-col space-y-1 items-start animate-pulse">
                {/* Display Name */}
                <div className="dark:bg-zinc-800 w-36 h-6 rounded-md" />
                {/* Username */}
                <div className="dark:bg-zinc-800 w-24 h-4 rounded-md mt-1" />
              </div>
            </div>
            {/* Title */}
            <div className="dark:bg-zinc-800 w-64 h-8 rounded-md mt-2 animate-pulse hidden sm:block" />
            <div />
          </div>
          <div className="px-5 pt-3">
            {/* Mobile Title */}
            <div className="dark:bg-zinc-800 w-44 h-8 rounded-md mb-2 animate-pulse sm:hidden" />
            {/* Description */}
            <div className="dark:bg-zinc-800 w-64 h-6 rounded-md mb-2 animate-pulse sm:w-96" />
            {/* Image */}
            <div className="bg-black max-w-[500px] min-w-[250px] max-h-[500px] min-h-[250px]" />
            {/* Stats */}
            <div className="inline-flex space-x-3 mt-3 animate-pulse">
              <div className="dark:bg-zinc-800 w-16 h-6 rounded-md" />
              <div className="dark:bg-zinc-800 w-16 h-6 rounded-md" />
            </div>
          </div>
        </div>
        {/* Reply Section */}
        <div className="dark:bg-zinc-800 w-32 h-9 rounded-md my-5 mx-auto animate-pulse sm:mx-0" />
        <div className="w-full rounded dark:bg-zinc-700 shadow-sm py-3 mb-5 sm:mb-10">
          <div className="px-5 pb-3 h-11 border-b border-zinc-300/50 dark:border-white/20"></div>
          {/* Replies */}
          <div className="pt-3">
            <div className="divide-y divide-zinc-300/50 dark:divide-white/20 grow">
              <LoadingSkeletonReply />
              <LoadingSkeletonReply />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoadingSkeleton;
