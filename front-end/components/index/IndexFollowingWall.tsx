import {
  useCurrentUserQuery,
  useGetFollowingWallQuery,
} from "@/codegen/graphql";
import Image from "next/image";
import Link from "next/link";
import { FaComment } from "react-icons/fa";
import { useContextualRouting } from "next-use-contextual-routing";
import CardToggleLikeButton from "../userProfile/CardToggleLikeButton";
import PostModal from "../postModal/PostModal";

type IndexFollowingWallProps = {};

function IndexFollowingWall({}: IndexFollowingWallProps) {
  const { makeContextualHref, returnHref } = useContextualRouting();
  const { data, loading } = useGetFollowingWallQuery();
  const { data: currentUserData, loading: currentUserLoading } =
    useCurrentUserQuery();

  if (loading || currentUserLoading) return <div></div>;

  return (
    <div className="mt-5 mb-10 flex justify-center">
      <div className="container">
        <h1 className="text-center text-5xl font-semibold mt-5">
          Following Wall
        </h1>
        {data?.followingWall?.length! >= 1 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mt-5">
              {data?.followingWall?.map((post, index) => (
                <div className="flex justify-center group" key={index}>
                  <div className="bg-zinc-50 dark:bg-zinc-700 rounded w-11/12 md:w-96 overflow-hidden">
                    <Link
                      href={makeContextualHref({ postId: post.id })}
                      as={`/p/${post.author.username}/posts/${post.id}`}
                      shallow={true}
                    >
                      <div className="bg-black h-96 md:max-h-72 overflow-hidden">
                        <Image
                          src={post.image}
                          alt="asd"
                          height={300}
                          width={300}
                          className="object-cover w-full h-full sm:group-hover:scale-105 sm:transition-transform sm:duration-300"
                        />
                      </div>
                    </Link>
                    <div className="px-3 py-4 text-center">
                      <Link
                        href={makeContextualHref({ postId: post.id })}
                        as={`/p/${post.author.username}/posts/${post.id}`}
                        shallow={true}
                      >
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
                      </Link>
                      <div className="inline-flex space-x-3 text-sm mt-3">
                        <CardToggleLikeButton
                          likeCount={post.likeCount}
                          likedPosts={currentUserData?.currentUser?.likedPosts!}
                          postId={post.id}
                        />
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
              ))}
            </div>
            {data?.followingWall?.length! < 9 && (
              <div className="mt-10">
                <p className="text-center text-xl font-light">
                  It's looking a bit empty in here...
                </p>
                <p className="text-center text-xl font-light">
                  Follow some more people for a bigger wall!
                </p>
              </div>
            )}
            <PostModal returnHref="/" />
          </>
        ) : (
          <>
            <p className="text-center text-xl font-light mt-3">
              It's looking a bit empty in here...
            </p>
            <p className="text-center text-xl font-light">
              Follow some people and their posts will appear here!
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default IndexFollowingWall;
