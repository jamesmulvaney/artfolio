import React from "react";

type CardSkeletonProps = {};

function CardSkeleton({}: CardSkeletonProps) {
  return (
    <div className="flex justify-center">
      <div className="bg-zinc-700 rounded w-11/12 md:w-96 overflow-hidden">
        <div className="bg-black h-96 md:max-h-72 overflow-hidden" />
        <div className="px-3 py-4 flex flex-col items-center">
          <div className="dark:bg-zinc-900 w-48 h-6 rounded-md animate-pulse" />
          <div className="dark:bg-zinc-900 w-24 h-4 rounded-md mt-1 animate-pulse" />
          <div className="inline-flex space-x-3 text-sm mt-3">
            <div className=" px-2 py-1 h-6 w-14 rounded-full dark:bg-zinc-900 mx-auto sm:mx-0 animate-pulse" />
            <div className=" px-2 py-1 h-6 w-14 rounded-full dark:bg-zinc-900 mx-auto sm:mx-0 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardSkeleton;
