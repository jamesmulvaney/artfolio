import React from "react";
import UnfollowButton from "./UnfollowButton";
import FollowButton from "./FollowButton";

type ToggleFollowButtonProps = {
  isFollowing: boolean;
  targetId: number;
  username: string;
};

function ToggleFollowButton({
  isFollowing,
  targetId,
  username,
}: ToggleFollowButtonProps) {
  return isFollowing ? (
    <UnfollowButton targetId={targetId} username={username} />
  ) : (
    <FollowButton targetId={targetId} username={username} />
  );
}

export default ToggleFollowButton;
