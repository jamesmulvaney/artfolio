import {
  DeletePostMutation,
  GetUserProfileDocument,
  GetUserProfileQuery,
} from "@/codegen/graphql";
import { ApolloCache } from "@apollo/client";

export const updatePostCache = (
  cache: ApolloCache<any>,
  cacheData: DeletePostMutation | null | undefined,
  username: string,
  postId: number
) => {
  if (!cacheData?.deletePost) return;

  //Remove post from user page cache
  const userPosts = cache.readQuery<GetUserProfileQuery>({
    query: GetUserProfileDocument,
    variables: {
      username,
    },
  });

  const newPostsArray = userPosts?.userByUsername?.posts?.filter(
    (post) => post.id !== postId
  );

  cache.writeQuery<GetUserProfileQuery>({
    query: GetUserProfileDocument,
    data: {
      __typename: "Query",
      userByUsername: {
        __typename: "User",
        ...userPosts?.userByUsername!,
        posts: newPostsArray,
      },
    },
    variables: {
      username,
    },
  });
};
