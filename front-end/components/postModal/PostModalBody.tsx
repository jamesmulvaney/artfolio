import { useCurrentUserQuery, useGetPostQuery } from "@/codegen/graphql";
import { Dialog } from "@headlessui/react";
import dayjs from "dayjs";
import Image from "next/image";
import React from "react";
import PostModalReply from "./PostModalReply";
import ReplyForm from "../forms/ReplyForm";
import Link from "next/link";
import ToggleLockButton from "../posts/ToggleLockButton";
import DeleteButton from "../posts/DeleteButton";
import PostModalLoadingSkeleton from "./loading/PostModalLoadingSkeleton";
import PostModalFollowButton from "./PostModalFollowButton";
import ModalToggleLikeButton from "./ModalToggleLikeButton";

type PostModalBodyProps = {
  postId: number;
};

function PostModalBody({ postId }: PostModalBodyProps) {
  const { data, loading } = useGetPostQuery({ variables: { id: postId } });
  const { data: currentUserFlagsData, loading: currentUserFlagsLoading } =
    useCurrentUserQuery();

  const test = false;

  if (loading || currentUserFlagsLoading || test)
    return <PostModalLoadingSkeleton />;

  if (!loading && !currentUserFlagsLoading && !test && !data)
    return (
      <Dialog.Description as="div">
        <h1 className="font-semibold text-4xl">Post Not Found!</h1>
      </Dialog.Description>
    );

  const currentUserFlags = currentUserFlagsData?.currentUser;

  return (
    <div className="flex flex-col justify-center transform overflow-hidden text-left align-middle rounded-lg my-3 lg:my-0 lg:flex-row lg:h-[90vh]">
      <div className="bg-black">
        <Image
          src={data?.post?.image!}
          alt="buhh"
          height={1000}
          width={1000}
          className="object-contain w-auto h-full max-h-[90vh]"
        />
      </div>
      <div className="flex flex-col w-full bg-white dark:bg-zinc-900 overflow-y-auto overflow-x-hidden lg:max-w-[500px] lg:min-w-[400px]">
        <Dialog.Title
          as="div"
          className="flex items-center justify-between mt-4 mb-3 px-4"
        >
          <div className="flex flex-row space-x-2 items-center">
            <Image
              src={data?.post?.author.avatar!}
              alt="ava"
              height={32}
              width={32}
              className="rounded-full"
            />
            <Link
              href={`/p/${data?.post?.author.username}`}
              className="flex flex-col space-y-1 items-start"
            >
              <p className="text-lg font-semibold leading-3">
                {data?.post?.author.displayName}
              </p>
              <p className="text-sm font-light text-black/75 dark:text-white/75 leading-3">
                @{data?.post?.author.username}
              </p>
            </Link>
          </div>
          <PostModalFollowButton
            targetId={data?.post?.author.id!}
            username={data?.post?.author.username!}
          />
        </Dialog.Title>
        <Dialog.Description
          as="div"
          className="px-4 border-b border-zinc-300/50 dark:border-white/20"
        >
          <p>{data?.post?.description}</p>
          <p className="text-xs text-black/70 dark:text-white/70 mt-1 mb-2">
            {dayjs(parseInt(data?.post?.createdAt!)).format(
              "hh:mm A [·] MMM DD YYYY"
            )}
          </p>
          <div className="inline-flex justify-between items-center w-full my-2">
            <div className="inline-flex items-center space-x-3 font-semibold text-sm">
              <ModalToggleLikeButton
                likeCount={data?.post?.likeCount!}
                likedPosts={currentUserFlags?.likedPosts!}
                postId={data?.post?.id!}
              />
              <p>{data?.post?.replyCount} Replies</p>
            </div>
            {currentUserFlags &&
            currentUserFlags.id === data?.post?.author.id ? (
              <div>
                <ToggleLockButton
                  flags={data.post?.flags!}
                  postId={data.post?.id}
                  size="xs"
                />
                <DeleteButton
                  postId={data.post?.id}
                  size="xs"
                  username={data.post?.author.username}
                />
              </div>
            ) : null}
          </div>
        </Dialog.Description>
        <div className="divide-y divide-zinc-300/50 dark:divide-white/20 grow">
          {data?.post?.replies!.length ? (
            data?.post?.replies.map((reply, index) => (
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
                No Replies...
              </h1>
            </div>
          )}
        </div>
        <div className="px-4 py-3 border-t border-zinc-300/50 dark:border-white/20">
          {currentUserFlags ? (
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
      </div>
    </div>
  );
}

export default PostModalBody;
