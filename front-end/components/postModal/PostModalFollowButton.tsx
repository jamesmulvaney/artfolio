import { useGetRelationInfoQuery } from "@/codegen/graphql";
import React from "react";
import ToggleFollowButton from "../general/ToggleFollowButton";

type PostModalFollowButtonProps = {
  targetId: number;
  username: string;
};

function PostModalFollowButton({
  targetId,
  username,
}: PostModalFollowButtonProps) {
  const { data, loading } = useGetRelationInfoQuery({
    variables: { id: targetId },
  });

  if (loading) return null;

  const { isFollowing, isProfileOwner } = data?.getRelationInfo!;

  return !isProfileOwner ? (
    <ToggleFollowButton
      isFollowing={isFollowing}
      targetId={targetId}
      username={username}
    />
  ) : null;
}

export default PostModalFollowButton;
