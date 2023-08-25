import {
  CurrentUserDocument,
  CurrentUserQuery,
  GetPostDocument,
  GetPostQuery,
  GetUserProfileDocument,
  GetUserProfileQuery,
  ToggleLikeMutation,
} from "@/codegen/graphql";
import { ApolloCache } from "@apollo/client";

export const updateLikedPostsCache = (
  cache: ApolloCache<any>,
  data: ToggleLikeMutation | null | undefined,
  postId: number,
  increment: boolean
) => {
  if (!data?.toggleLike) return;

  const user = cache.readQuery<CurrentUserQuery>({
    query: CurrentUserDocument,
  });

  const post = cache.readQuery<GetPostQuery>({
    query: GetPostDocument,
    variables: {
      id: postId,
    },
  });

  if (increment) {
    cache.writeQuery<CurrentUserQuery>({
      query: CurrentUserDocument,
      data: {
        __typename: "Query",
        currentUser: {
          ...user?.currentUser!,
          likedPosts: [
            ...user?.currentUser?.likedPosts!,
            { id: postId, __typename: "Post" },
          ],
        },
      },
    });
  } else {
    cache.writeQuery<CurrentUserQuery>({
      query: CurrentUserDocument,
      data: {
        __typename: "Query",
        currentUser: {
          ...user?.currentUser!,
          likedPosts: user?.currentUser?.likedPosts?.filter(
            (p) => p.id !== postId
          ),
        },
      },
    });
  }

  if (post) {
    cache.writeQuery<GetPostQuery>({
      query: GetPostDocument,
      data: {
        __typename: "Query",
        post: {
          ...post?.post!,
          likeCount: increment
            ? post?.post?.likeCount! + 1
            : post?.post?.likeCount! - 1,
        },
      },
      variables: {
        id: postId,
      },
    });
  }
};
