import { Dialog } from "@headlessui/react";
import React from "react";
import PostModalLoadingSkeletonReply from "./PostModalLoadingSkeletonReply";

type PostModalLoadingSkeletonProps = {};

function PostModalLoadingSkeleton({}: PostModalLoadingSkeletonProps) {
  return (
    <div className="flex flex-col justify-center transform overflow-hidden text-left align-middle rounded-lg my-3 lg:my-0 lg:flex-row lg:h-[90vh]">
      {/* Image */}
      <div className="bg-black">
        <div className="w-[500px] h-[500px] lg:h-[1000px] xl:w-[800px]" />
      </div>
      {/* Post Section */}
      <div className="flex flex-col w-full bg-white dark:bg-zinc-900 overflow-y-auto overflow-x-hidden lg:max-w-[500px] lg:min-w-[400px]">
        <Dialog.Title
          as="div"
          className="flex items-center justify-between mt-4 mb-3 px-4"
        >
          <div className="flex flex-row space-x-2 items-center">
            {/* Avatar */}
            <div className="dark:bg-zinc-800 w-8 h-8 rounded-full animate-pulse" />
            <div className="flex flex-col space-y-1 items-start animate-pulse">
              {/* Display Name */}
              <div className="dark:bg-zinc-800 w-36 h-4 rounded-md" />
              {/* Username */}
              <div className="dark:bg-zinc-800 w-24 h-2 rounded-md mt-1" />
            </div>
          </div>
          {/* Follow Button */}
          <div className="px-3 py-2 h-8 w-20 rounded dark:bg-zinc-800 animate-pulse" />
        </Dialog.Title>
        <Dialog.Description
          as="div"
          className="px-4 border-b border-zinc-300/50 dark:border-white/20"
        >
          {/* Description */}
          <div className="dark:bg-zinc-800 w-64 h-4 rounded-md mt-2 animate-pulse" />
          {/* Date Posted */}
          <div className="dark:bg-zinc-800 w-24 h-2 rounded-md mt-2 animate-pulse" />
          {/* Like Reply Count */}
          <div className="inline-flex space-x-3 text-sm mt-2 animate-pulse">
            <div className="dark:bg-zinc-800 w-24 h-4 rounded-md" />
            <div className="dark:bg-zinc-800 w-24 h-4 rounded-md" />
          </div>
        </Dialog.Description>
        {/* Replies */}
        <div className="divide-y divide-zinc-300/50 dark:divide-white/20 grow">
          <PostModalLoadingSkeletonReply />
          <PostModalLoadingSkeletonReply />
          <PostModalLoadingSkeletonReply />
        </div>
        {/* Reply Form */}
        <div className="h-16 px-4 py-3 border-t border-zinc-300/50 dark:border-white/20"></div>
      </div>
    </div>
  );
}

export default PostModalLoadingSkeleton;
