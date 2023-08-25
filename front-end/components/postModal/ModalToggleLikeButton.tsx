import { useToggleLikeMutation } from "@/codegen/graphql";
import { updateLikedPostsCache } from "@/utils/updateLikedPostsCache";
import { FaHeart } from "react-icons/fa";

type ModalToggleLikeButtonProps = {
  likeCount: number;
  likedPosts: {
    __typename?: "Post" | undefined;
    id: number;
  }[];
  postId: number;
};

function ModalToggleLikeButton({
  likeCount,
  likedPosts,
  postId,
}: ModalToggleLikeButtonProps) {
  const [toggleLike] = useToggleLikeMutation();

  const onToggleLike = async (increment: boolean) => {
    await toggleLike({
      variables: {
        id: postId,
      },
      update: (cache, { data }) => {
        updateLikedPostsCache(cache, data, postId, increment);
      },
    });
  };

  return likedPosts && likedPosts.some((post) => post.id === postId) ? (
    <div
      role="button"
      onClick={() => onToggleLike(false)}
      className="rounded-full inline-flex items-center px-3 py-1 text-pink-600 dark:text-pink-500 outline outline-1 dark:outline-white/20 hover:text-pink-500 hover:dark:text-pink-400 hover:bg-pink-600/10 hover:dark:bg-pink-600/20 transition duration-300"
    >
      <FaHeart className="mr-2" />
      {likeCount}
    </div>
  ) : (
    <div
      role="button"
      onClick={() => likedPosts && onToggleLike(true)}
      className="rounded-full inline-flex items-center px-3 py-1 outline outline-1 dark:outline-white/20 hover:text-pink-600 hover:dark:text-pink-500 hover:bg-pink-600/10 hover:dark:bg-zinc-600 transition duration-300"
    >
      <FaHeart className="mr-2" />
      {likeCount}
    </div>
  );
}

export default ModalToggleLikeButton;
