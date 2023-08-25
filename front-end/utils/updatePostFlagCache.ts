import {
  GetPostDocument,
  GetPostQuery,
  TogglePostLockMutation,
} from "@/codegen/graphql";
import { ApolloCache } from "@apollo/client";

export const updatePostFlagCache = (
  cache: ApolloCache<any>,
  cacheData: TogglePostLockMutation | null | undefined,
  postId: number
) => {
  if (!cacheData?.togglePostLock) return;

  //Update post flag
  const post = cache.readQuery<GetPostQuery>({
    query: GetPostDocument,
    variables: {
      id: postId,
    },
  });

  cache.writeQuery<GetPostQuery>({
    query: GetPostDocument,
    data: {
      __typename: "Query",
      post: {
        ...post?.post!,
        flags: cacheData.togglePostLock,
      },
    },
  });
};
