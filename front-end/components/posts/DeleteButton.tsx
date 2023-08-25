import { useDeletePostMutation } from "@/codegen/graphql";
import { updatePostCache } from "@/utils/updatePostCache";
import { useRouter } from "next/navigation";
import React from "react";
import { FaTrash } from "react-icons/fa";

type DeleteButtonProps = {
  postId: number;
  size: "xs" | "sm";
  username: string;
};

function DeleteButton({ postId, size, username }: DeleteButtonProps) {
  const router = useRouter();
  const [deletePost] = useDeletePostMutation();

  return (
    <button
      type="button"
      onClick={async () => {
        await deletePost({
          variables: {
            pid: postId,
          },
          update: (cache, { data }) => {
            updatePostCache(cache, data, username, postId);
          },
        });

        router.push(`/p/${username}`);
      }}
      className={`inline-flex items-center ${
        size === "sm" ? "px-3 py-2 text-sm" : "px-2 py-1 text-xs"
      } rounded font-semibold bg-red-400 dark:bg-red-700 hover:bg-red-500 hover:shadow-sm focus:ring-2 focus:ring-red-400 focus:dark:ring-red-800 transition duration-300`}
    >
      <FaTrash className="mr-1" />
      Delete
    </button>
  );
}

export default DeleteButton;
