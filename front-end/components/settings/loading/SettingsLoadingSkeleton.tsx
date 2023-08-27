import React from "react";

type SettingsLoadingSkeletonProps = {};

function SettingsLoadingSkeleton({}: SettingsLoadingSkeletonProps) {
  return (
    <div className="mt-5 md:flex md:justify-center">
      <div className="flex flex-col justify-center items-center md:container md:flex-none md:justify-normal md:items-start">
        <div className="dark:bg-zinc-800 w-52 h-10 mb-5 rounded-md mx-auto sm:mx-0 animate-pulse" />
        <div className="dark:bg-zinc-800 w-60 h-7 mb-1 rounded-md mx-auto sm:mx-0 animate-pulse" />
        <div className="dark:bg-zinc-800 w-64 h-6 mb-3 rounded-md mx-auto sm:mx-0 animate-pulse" />
        <div className="p-3 border border-zinc-300/50 dark:border-white/20 dark:bg-zinc-800 w-3/4 mb-2 text-center md:text-left md:w-3/5 lg:w-1/2 animate-pulse">
          <div className="w-36 h-6" />
        </div>
        <div className="p-3 border border-zinc-300/50 dark:border-white/20 dark:bg-zinc-800 w-3/4 mb-2 text-center md:text-left md:w-3/5 lg:w-1/2 animate-pulse">
          <div className="w-36 h-6" />
        </div>
        <div className="p-3 border border-zinc-300/50 dark:border-white/20 dark:bg-zinc-800 w-3/4 mb-2 text-center md:text-left md:w-3/5 lg:w-1/2 animate-pulse">
          <div className="w-36 h-6" />
        </div>
        <div className="p-3 border border-zinc-300/50 dark:border-white/20 dark:bg-zinc-800 w-3/4 mb-2 text-center md:text-left md:w-3/5 lg:w-1/2 animate-pulse">
          <div className="w-36 h-6" />
        </div>
        <div className="p-3 border border-zinc-300/50 dark:border-white/20 dark:bg-zinc-800 w-3/4 mb-2 text-center md:text-left md:w-3/5 lg:w-1/2 animate-pulse">
          <div className="w-36 h-6" />
        </div>
        <div className="dark:bg-zinc-800 w-52 h-10 mb-3 mt-5 rounded-md mx-auto sm:mx-0 animate-pulse" />
        <div className="dark:bg-zinc-800 w-36 h-8 mb-2 rounded mx-auto sm:mx-0 animate-pulse" />
        <div className="dark:bg-zinc-800 w-36 h-8 mb-2 rounded mx-auto sm:mx-0 animate-pulse" />
        <div className="dark:bg-zinc-800 w-36 h-8 mb-2 rounded mx-auto sm:mx-0 animate-pulse" />
      </div>
    </div>
  );
}

export default SettingsLoadingSkeleton;
