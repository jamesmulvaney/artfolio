import { useCurrentUserQuery, useGetPostQuery } from "@/codegen/graphql";
import ReplyForm from "@/components/forms/ReplyForm";
import Layout from "@/components/general/Layout";
import DeleteButton from "@/components/posts/DeleteButton";
import LoadingSkeleton from "@/components/posts/LoadingSkeleton";
import ToggleLockButton from "@/components/posts/ToggleLockButton";
import PostModalFollowButton from "@/components/postModal/PostModalFollowButton";
import PostModalReply from "@/components/postModal/PostModalReply";
import { withApollo } from "@/utils/withApollo";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { FaHeart, FaLink } from "react-icons/fa";
import Head from "next/head";

type PostPageProps = {};

function PostPage({}: PostPageProps) {
  const router = useRouter();
  const postIdQuery = router.query.postId as string;
  const postId = parseInt(postIdQuery);

  const { data, loading } = useGetPostQuery({ variables: { id: postId } });
  const { data: currentUserData, loading: currentUserDataLoading } =
    useCurrentUserQuery();

  if (loading || currentUserDataLoading) {
    return (
      <Layout>
        <LoadingSkeleton />
      </Layout>
    );
  }

  if (!loading && !currentUserDataLoading && !data?.post)
    return (
      <div>
        <h1 className="font-semibold text-4xl">Post Not Found!</h1>
      </div>
    );

  return (
    <>
      <Head>
        <title>Title Here | Artfolio</title>
        <meta property="og:title" content={`Title Here @Artfolio`} />
      </Head>
      <Layout>
        <div className="flex justify-center sm:mt-5">
          <div className="container">
            {/* Post Section */}
            <div className="w-full rounded bg-zinc-50 dark:bg-zinc-700 shadow-sm py-3 mt-5 sm:mt-0">
              <div className="flex flex-row justify-between items-center px-5 pb-3 border-b border-zinc-300/50 dark:border-white/20">
                <div className="flex flex-row space-x-2">
                  <Image
                    src={data?.post?.author.avatar!}
                    alt="avatar"
                    height={64}
                    width={64}
                    className="rounded-full"
                  />
                  <Link
                    href={`/p/${data?.post?.author.username}`}
                    className="flex flex-col justify-center"
                  >
                    <h1 className="font-semibold text-xl">
                      {data?.post?.author.displayName}
                    </h1>
                    <p className="font-light text-sm text-black/90 dark:text-white/90">
                      @{data?.post?.author.username}
                    </p>
                  </Link>
                </div>
                <h1 className="font-semibold text-xl hidden sm:block">
                  {data?.post?.title}
                </h1>
                {currentUserData?.currentUser ? (
                  currentUserData.currentUser.id === data?.post?.author.id ? (
                    <div>
                      <ToggleLockButton
                        flags={data.post?.flags!}
                        postId={data.post.id}
                        size="sm"
                      />
                      <DeleteButton
                        postId={data.post.id}
                        size="sm"
                        username={data.post.author.username}
                      />
                    </div>
                  ) : (
                    <PostModalFollowButton
                      targetId={data?.post?.author.id!}
                      username={data?.post?.author.username!}
                    />
                  )
                ) : (
                  <div />
                )}
              </div>
              <div className="px-5 pt-3">
                <h1 className="font-semibold text-xl mb-2 sm:hidden">
                  {data?.post?.title}
                </h1>
                <p className="font-light text-lg mb-2">
                  {data?.post?.description}
                </p>
                <div>
                  <Image
                    src={data?.post?.image!}
                    alt={`${data?.post?.author.displayName}'s picture`}
                    width={1000}
                    height={1000}
                    priority
                    className="object-contain h-full w-auto max-h-screen"
                  />
                </div>
                <div className="inline-flex space-x-3 text-sm mt-3">
                  <button className="rounded-full inline-flex items-center mt-1 px-3 py-1 text-sm outline outline-1 dark:outline-white/20 hover:dark:text-pink-500 hover:dark:bg-zinc-600 transition duration-300 disabled:cursor-not-allowed">
                    <FaHeart className="mr-1.5" />
                    {data?.post?.likeCount}
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `${process.env.NEXT_PUBLIC_SITE_URL}/p/${data?.post?.author.username}/posts/${postId}`
                      );
                    }}
                    className="rounded-full inline-flex items-center mt-1 px-3 py-1 text-sm outline outline-1 dark:outline-white/20 hover:dark:text-amber-400 hover:dark:bg-zinc-600 transition duration-300 disabled:cursor-not-allowed"
                  >
                    <FaLink className="mr-1.5" />
                    Share
                  </button>
                </div>
              </div>
            </div>
            {/* Reply Section */}
            <h1 className="font-semibold text-2xl my-5 text-center sm:text-start">
              Replies - {data?.post?.replyCount}
            </h1>
            <div className="w-full rounded bg-zinc-50 dark:bg-zinc-700 shadow-sm py-3 mb-5 sm:mb-10">
              <div className="px-5 pb-3 border-b border-zinc-300/50 dark:border-white/20">
                {currentUserData?.currentUser ? (
                  data?.post?.flags!.includes("isLocked") ? (
                    <h1 className="text-center text-lg text-black/90 dark:text-white/90">
                      This post is locked and you cannot reply.
                    </h1>
                  ) : (
                    <ReplyForm postId={postId} />
                  )
                ) : (
                  <h1 className="text-center text-lg text-black/90 dark:text-white/90">
                    <Link
                      href="/login"
                      className="font-semibold text-black/90 dark:text-white"
                    >
                      Log in
                    </Link>{" "}
                    to reply!
                  </h1>
                )}
              </div>
              {/* Replies */}
              <div className="pt-3">
                <div className="divide-y divide-zinc-300/50 dark:divide-white/20 grow">
                  {data?.post?.replies!.length ? (
                    data?.post.replies.map((reply, index) => (
                      <PostModalReply
                        avatar={reply.author.avatar}
                        dateCreated={reply.createdAt}
                        description={reply.text}
                        displayName={reply.author.displayName}
                        username={reply.author.username}
                        key={index}
                      />
                    ))
                  ) : (
                    <div className="px-4 py-3 ">
                      <h1 className="font-semibold text-lg text-center text-black/90 dark:text-white/90">
                        Be the first to reply!
                      </h1>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default withApollo({ ssr: true })(PostPage);
