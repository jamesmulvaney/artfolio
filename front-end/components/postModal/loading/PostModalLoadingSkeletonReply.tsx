import React from "react";

type PostModalLoadingSkeletonReplyProps = {};

function PostModalLoadingSkeletonReply({}: PostModalLoadingSkeletonReplyProps) {
  return (
    <div className="flex flex-row space-x-2 items-start px-4 py-3">
      {/* Avatar */}
      <div className="dark:bg-zinc-800 w-8 h-8 rounded-full animate-pulse" />
      <div className="flex flex-col items-start">
        {/* Display Name / Username */}
        <div className="inline-flex space-x-2 items-center mb-1">
          <div className="dark:bg-zinc-800 w-28 h-4 rounded-md" />
          <div className="dark:bg-zinc-800 w-16 h-2 rounded-md" />
        </div>
        {/* Description */}
        <div className="dark:bg-zinc-800 w-64 h-4 rounded-md mt-2 animate-pulse" />
        {/* Date Posted */}
        <div className="dark:bg-zinc-800 w-24 h-2 rounded-md mt-2 animate-pulse" />
        {/* Like Button */}
        <div className="dark:bg-zinc-800 w-12 h-6 rounded-full mt-2 animate-pulse" />
      </div>
    </div>
  );
}

export default PostModalLoadingSkeletonReply;
