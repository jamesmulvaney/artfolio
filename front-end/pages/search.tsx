import {
  SearchForPostQuery,
  useCurrentUserQuery,
  useSearchForPostQuery,
} from "@/codegen/graphql";
import Layout from "@/components/general/Layout";
import PostModal from "@/components/postModal/PostModal";
import LoadingSkeleton from "@/components/search/loading/LoadingSkeleton";
import CardToggleLikeButton from "@/components/userProfile/CardToggleLikeButton";
import { withApollo } from "@/utils/withApollo";
import { useContextualRouting } from "next-use-contextual-routing";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FaComment, FaHeart } from "react-icons/fa";

type SearchPageProps = {};

function SearchPage({}: SearchPageProps) {
  const router = useRouter();
  const { makeContextualHref, returnHref } = useContextualRouting();
  const { data, loading } = useSearchForPostQuery({
    variables: { query: (router.query.q as string) || "" },
  });
  const { data: currentUserData, loading: currentUserLoading } =
    useCurrentUserQuery();

  useEffect(() => {
    if (!router.query.q) {
      router.push("/");
    }
  }, [router]);

  if (loading || currentUserLoading) return <LoadingSkeleton />;

  if (!loading && !data?.searchPost) return <Layout>Nothing</Layout>;

  return (
    <Layout>
      <div className="mt-5 mb-10 flex justify-center">
        <div className="container">
          <h1 className="text-center text-2xl font-semibold mt-5">
            Search Result
          </h1>
          <p className="text-center font-light text-sm italic text-black/80 dark:text-white/80 mb-3">
            Query: {router.query.q}
          </p>
          {data?.searchPost?.length! >= 1 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mt-5">
                {data?.searchPost?.map((post, index) => (
                  <div className="flex justify-center group" key={index}>
                    <div className="bg-zinc-700 rounded w-11/12 md:w-96 overflow-hidden">
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
                          <h1 className="font-semibold text-xl">
                            {post.title}
                          </h1>
                          <p className="text-sm">{post.description}</p>
                        </Link>
                        <div className="inline-flex space-x-3 text-sm mt-3">
                          {currentUserData?.currentUser ? (
                            <CardToggleLikeButton
                              likeCount={post.likeCount}
                              likedPosts={
                                currentUserData?.currentUser?.likedPosts!
                              }
                              postId={post.id}
                            />
                          ) : (
                            <button
                              disabled
                              className="rounded-full inline-flex items-center px-2 py-1 outline outline-1 dark:outline-white/20 hover:dark:text-pink-500 hover:dark:bg-zinc-600 transition duration-300"
                            >
                              <FaHeart className="mr-2" />
                              {post.likeCount}
                            </button>
                          )}
                          <button className="rounded-full inline-flex items-center px-2 py-1 outline outline-1 dark:outline-white/20 hover:dark:text-blue-400 hover:dark:bg-zinc-600 transition duration-300">
                            <FaComment className="mr-2" />
                            {post.replyCount}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <PostModal returnHref={`/search?q=${router.query.q}`} />
            </>
          ) : (
            <p className="text-center text-xl font-light mt-3">
              No posts found matching that query.
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default withApollo({ ssr: true })(SearchPage);
