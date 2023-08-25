import React from "react";
import ProfileBitSkeleton from "./loading/ProfileBitSkeleton";
import PostCardSkeleton from "./loading/PostCardSkeleton";

type LoadingSkeletonProps = {};

function LoadingSkeleton({}: LoadingSkeletonProps) {
  return (
    <div className="flex justify-center sm:mt-5">
      <div className="container">
        {/* Profile Bit */}
        <ProfileBitSkeleton />
        {/* Posts */}
        <div className="mt-5 sm:mt-10 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4">
            <PostCardSkeleton />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoadingSkeleton;
