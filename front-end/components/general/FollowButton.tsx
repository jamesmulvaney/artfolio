import {
  GetRelationInfoDocument,
  GetRelationInfoQuery,
  GetUserProfileDocument,
  GetUserProfileQuery,
  useFollowMutation,
} from "@/codegen/graphql";
import React from "react";

type FollowButtonProps = {
  targetId: number;
  username: string;
};

function FollowButton({ targetId, username }: FollowButtonProps) {
  const [follow] = useFollowMutation();

  const onFollow = async () => {
    await follow({
      variables: {
        tid: targetId,
      },
      update: (cache, { data }) => {
        if (data?.follow.errors) return;

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
              followerCount: userProfile?.userByUsername?.followerCount! + 1,
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
              isFollowing: true,
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
      onClick={onFollow}
      className="px-3 py-2 rounded text-sm font-semibold bg-blue-500 dark:bg-blue-700 hover:bg-blue-600 hover:shadow-sm focus:ring-2 focus:ring-blue-400 focus:dark:ring-blue-800 transition duration-300"
    >
      Follow
    </button>
  );
}

export default FollowButton;
