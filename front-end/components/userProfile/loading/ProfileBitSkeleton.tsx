import React from "react";

type ProfileBitSkeletonProps = {};

function ProfileBitSkeleton({}: ProfileBitSkeletonProps) {
  return (
    <div className="relative w-full rounded dark:bg-zinc-700 shadow-sm p-1 mt-5 sm:mt-0 z-0">
      <div className="w-full h-40 sm:h-60 bg-black"></div>
      <div className="flex flex-col items-center -mt-16 mb-12 px-2 sm:px-0 sm:flex-row sm:items-start">
        {/* Avatar */}
        <div className="w-32 h-32 rounded-full bg-black border-4 dark:border-zinc-700 sm:ml-8" />
        <div className="mt-2 max-w-xl text-center sm:text-start sm:ml-4 sm:mt-4 animate-pulse">
          {/* Display Name */}
          <div className="dark:bg-zinc-900 w-36 h-6 rounded-md mx-auto sm:mx-0 animate-pulse" />
          {/* Username */}
          <div className="dark:bg-zinc-900 w-24 h-4 rounded-md mt-1 mx-auto sm:mx-0 animate-pulse" />
          {/* Bio */}
          <div className="dark:bg-zinc-900 w-64 h-4 rounded-md mt-2 animate-pulse" />
          {/* Stats */}
          <div className="inline-flex space-x-3 text-sm mt-2 animate-pulse">
            <div className="dark:bg-zinc-900 w-24 h-4 rounded-md" />
            <div className="dark:bg-zinc-900 w-24 h-4 rounded-md" />
          </div>
          {/* Follow Button */}
          <div className="mt-2">
            <div className="px-3 py-2 h-8 w-24 rounded dark:bg-zinc-900 mx-auto sm:mx-0 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileBitSkeleton;
