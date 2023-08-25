import {
  GetRelationInfoDocument,
  GetRelationInfoQuery,
  GetUserProfileDocument,
  GetUserProfileQuery,
  useUnfollowMutation,
} from "@/codegen/graphql";
import React from "react";

type UnfollowButtonProps = {
  targetId: number;
  username: string;
};

function UnfollowButton({ targetId, username }: UnfollowButtonProps) {
  const [unfollow] = useUnfollowMutation();

  const onUnfollow = async () => {
    await unfollow({
      variables: {
        tid: targetId,
      },
      update: (cache, { data }) => {
        if (!data?.unfollow) return;

        //Update target's follower count
        const userProfile = cache.readQuery<GetUserProfileQuery>({
          query: GetUserProfileDocument,
          variables: {
            username,
          },
        });

        cache.writeQuery<GetUserProfileQuery>({
          query: GetUserProfileDocument,
          data: {
            __typename: "Query",
            userByUsername: {
              __typename: "User",
              ...userProfile?.userByUsername!,
              followerCount: userProfile?.userByUsername?.followerCount! - 1,
            },
          },
          variables: {
            username,
          },
        });

        cache.writeQuery<GetRelationInfoQuery>({
          query: GetRelationInfoDocument,
          data: {
            __typename: "Query",
            getRelationInfo: {
              isFollowing: false,
              isProfileOwner: false,
            },
          },
          variables: {
            id: targetId,
          },
        });
      },
    });
  };

  return (
    <button
      type="button"
      onClick={onUnfollow}
      className="px-3 py-2 rounded text-sm font-semibold bg-red-500 dark:bg-red-700 hover:bg-red-600 hover:shadow-sm focus:ring-2 focus:ring-red-400 focus:dark:ring-red-800 transition duration-300"
    >
      Unfollow
    </button>
  );
}

export default UnfollowButton;
