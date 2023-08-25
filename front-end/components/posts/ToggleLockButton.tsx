import { useTogglePostLockMutation } from "@/codegen/graphql";
import { updatePostFlagCache } from "@/utils/updatePostFlagCache";
import React from "react";
import { FaLock, FaLockOpen } from "react-icons/fa";

type ToggleLockButtonProps = {
  flags: string[];
  postId: number;
  size: "xs" | "sm";
};

function ToggleLockButton({ postId, flags, size }: ToggleLockButtonProps) {
  const [toggleLock] = useTogglePostLockMutation();

  return (
    <button
      type="button"
      onClick={async () => {
        await toggleLock({
          variables: { id: postId },
          update: (cache, { data }) => {
            updatePostFlagCache(cache, data, postId);
          },
        });
      }}
      className={`inline-flex items-center ${
        size === "sm" ? "mr-3 px-3 py-2 text-sm" : "mr-2 px-2 py-1 text-xs"
      } rounded font-semibold bg-yellow-400 dark:bg-yellow-700 hover:bg-yellow-500 hover:shadow-sm focus:ring-2 focus:ring-yellow-400 focus:dark:ring-yellow-800 transition duration-300`}
    >
      {flags.includes("isLocked") ? (
        <>
          <FaLockOpen className="mr-1" />
          Unlock
        </>
      ) : (
        <>
          <FaLock className="mr-1" />
          Lock
        </>
      )}
    </button>
  );
}

export default ToggleLockButton;
