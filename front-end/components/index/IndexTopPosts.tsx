import { useGetTopPostsQuery } from "@/codegen/graphql";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaComment, FaHeart } from "react-icons/fa";
import CardSkeleton from "./loading/CardSkeleton";

type IndexTopPostsProps = {};

function IndexTopPosts({}: IndexTopPostsProps) {
  const { data, loading } = useGetTopPostsQuery();

  if (loading) {
    return (
      <>
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </>
    );
  }

  return (
    <>
      {data?.topPosts?.map((post, index) => (
        <Link href={`/p/${post.author.username}/posts/${post.id}`} key={index}>
          <div className="flex justify-center">
            <div className="bg-zinc-50 dark:bg-zinc-700 rounded w-11/12 md:w-96 overflow-hidden">
              <div className="bg-black h-96 md:max-h-72 overflow-hidden">
                <Image
                  src={post.image}
                  alt="asd"
                  height={300}
                  width={300}
                  className="object-cover w-full h-full sm:group-hover:scale-105 sm:transition-transform sm:duration-300"
                />
              </div>
              <div className="px-3 py-4 text-center">
                <div className="inline-flex justify-center">
                  <Image
                    src={post.author.avatar}
                    alt="a"
                    width={20}
                    height={20}
                    className="rounded-full h-5 w-5 bg-black mr-1"
                  />
                  <p className="text-sm font-semibold mr-0.5">
                    {post.author.displayName}
                  </p>
                </div>
                <h1 className="font-semibold text-xl">{post.title}</h1>
                <p className="text-sm">{post.description}</p>
                <div className="inline-flex space-x-3 text-sm mt-3">
                  <button
                    disabled
                    className="rounded-full inline-flex items-center px-2 py-1 outline outline-1 dark:outline-white/20 hover:text-pink-600 hover:dark:text-pink-500 hover:bg-pink-600/10 hover:dark:bg-zinc-600 transition duration-300"
                  >
                    <FaHeart className="mr-2" />
                    {post.likeCount}
                  </button>
                  <button
                    disabled
                    className="rounded-full inline-flex items-center px-2 py-1 outline outline-1 dark:outline-white/20 hover:text-blue-700 hover:dark:text-blue-400 hover:bg-zinc-200 hover:dark:bg-zinc-600 transition duration-300"
                  >
                    <FaComment className="mr-2" />
                    {post.replyCount}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
}

export default IndexTopPosts;
