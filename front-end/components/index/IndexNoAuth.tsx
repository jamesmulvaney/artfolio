import Image from "next/image";
import React from "react";
import IndexTopPosts from "./IndexTopPosts";
import Link from "next/link";

type IndexNoAuthProps = {};

function IndexNoAuth({}: IndexNoAuthProps) {
  return (
    <>
      <div className="relative h-[75vh] dark:bg-zinc-950">
        <Image
          src="https://i.imgur.com/tr6lXUz.jpg"
          alt="pixiv"
          width={1200}
          height={518}
          priority
          className="object-cover w-screen h-full"
        />
        <div className="absolute top-0 h-[75vh] w-full flex flex-col justify-center items-center backdrop-brightness-75 text-center">
          <h1 className="text-4xl text-white font-semibold">
            Welcome to Artfolio!
          </h1>
          <p className="text-white font-light mt-2">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates
            harum.
          </p>
          <p className="text-white font-light">
            Doloremque dignissimos tenetur explicabo quasi adipisci laudantium
            in voluptatem.
          </p>
          <p className="text-xs text-white font-light">
            Test image by Pixiv user @あさぎり (asagiri)
          </p>
          <div className="mt-3">
            <Link
              href="/login"
              className="px-3 py-2 mr-2 rounded text-sm text-white font-semibold bg-blue-500 dark:bg-blue-700 hover:bg-blue-600 hover:shadow-sm focus:ring-2 focus:ring-blue-400 focus:dark:ring-blue-800 transition duration-300"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="px-3 py-2 rounded text-sm text-white font-semibold bg-gray-500 dark:bg-gray-700 hover:bg-gray-600 hover:shadow-sm focus:ring-2 focus:ring-gray-400 focus:dark:ring-gray-800 transition duration-300"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-5 mb-10 flex justify-center">
        <div className="container">
          <h1 className="text-xl text-center font-semibold">
            Take a peek at some of the most popular posts!
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mt-5">
            <IndexTopPosts />
          </div>
        </div>
      </div>
    </>
  );
}

export default IndexNoAuth;
