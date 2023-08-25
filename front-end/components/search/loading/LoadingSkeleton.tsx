import Layout from "@/components/general/Layout";
import CardSkeleton from "@/components/index/loading/CardSkeleton";
import React from "react";

type LoadingSkeletonProps = {};

function LoadingSkeleton({}: LoadingSkeletonProps) {
  return (
    <Layout>
      <div className="mt-5 mb-10 flex justify-center">
        <div className="container">
          <div className="flex flex-col items-center animate-pulse">
            <div className="dark:bg-zinc-800 mt-5 w-48 h-8 rounded-md text-center" />
            <div className="dark:bg-zinc-800 mt-0.5 w-24 h-5 rounded-md text-center mb-3" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mt-5">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default LoadingSkeleton;
