import Image from "next/image";
import React from "react";
import dayjs from "dayjs";
import Link from "next/link";

type PostModalReplyProps = {
  avatar: string;
  dateCreated: string;
  description: string;
  displayName: string;
  username: string;
};

function PostModalReply({
  avatar,
  dateCreated,
  description,
  displayName,
  username,
}: PostModalReplyProps) {
  return (
    <div className="flex flex-row space-x-2 items-start px-4 py-3">
      <Image
        src={avatar}
        alt="buhh"
        height={32}
        width={32}
        className="rounded-full"
      />
      <div className="flex flex-col items-start">
        <Link
          href={`/p/${username}`}
          className="inline-flex space-x-2 items-center mb-1"
        >
          <h1 className="font-semibold text-lg leading-none">{displayName}</h1>
          <p className="text-xs text-black/80 dark:text-white/80 font-light">
            @{username}
          </p>
        </Link>
        <p>{description}</p>
        <p className="text-xs text-black/70 dark:text-white/70 mt-1 mb-2">
          {dayjs(parseInt(dateCreated)).format("hh:mm A [·] MMM DD YYYY")}
        </p>
      </div>
    </div>
  );
}

export default PostModalReply;
