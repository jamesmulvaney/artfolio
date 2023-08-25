import Image from "next/image";
import { FaComment } from "react-icons/fa";
import Link from "next/link";
import { useContextualRouting } from "next-use-contextual-routing";
import CardToggleLikeButton from "./CardToggleLikeButton";

type PostCardProps = {
  description: string;
  id: number;
  image: string;
  likeCount: number;
  replyCount: number;
  title: string;
  userLikedPosts: {
    __typename?: "Post" | undefined;
    id: number;
  }[];
  username: string;
};

function PostCard({
  description,
  id,
  image,
  likeCount,
  replyCount,
  title,
  userLikedPosts,
  username,
}: PostCardProps) {
  const { makeContextualHref, returnHref } = useContextualRouting();

  return (
    <div className="flex justify-center">
      <div className="bg-zinc-50 dark:bg-zinc-700 rounded w-11/12 md:w-96 overflow-hidden">
        <Link
          href={makeContextualHref({ postId: id })}
          as={`/p/${username}/posts/${id}`}
          shallow={true}
        >
          <div className="bg-black h-96 md:max-h-72 overflow-hidden">
            <Image
              src={image}
              alt="asd"
              height={300}
              width={300}
              className="object-cover w-full h-full sm:group-hover:scale-105 sm:transition-transform sm:duration-300"
            />
          </div>
        </Link>
        <div className="px-3 py-4 text-center">
          <Link
            href={makeContextualHref({ postId: id })}
            as={`/p/${username}/posts/${id}`}
            shallow={true}
          >
            <h1 className="font-semibold text-xl">{title}</h1>
            <p className="text-sm">{description}</p>
          </Link>
          <div className="inline-flex space-x-3 text-sm mt-3">
            <CardToggleLikeButton
              likeCount={likeCount}
              likedPosts={userLikedPosts}
              postId={id}
            />
            <button className="rounded-full inline-flex items-center px-2 py-1 outline outline-1 dark:outline-white/20 hover:text-blue-700 hover:dark:text-blue-400 hover:bg-zinc-200 hover:dark:bg-zinc-600 transition duration-300">
              <FaComment className="mr-2" />
              {replyCount}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
