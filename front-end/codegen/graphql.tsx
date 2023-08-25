import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CreatePostInput = {
  description: Scalars['String'];
  image: Scalars['String'];
  title: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Follow = {
  __typename?: 'Follow';
  createdAt: Scalars['String'];
  following: User;
  followingId: Scalars['Int'];
  id: Scalars['Int'];
  updatedAt: Scalars['String'];
  user: User;
  userId: Scalars['Int'];
};

export type FollowResponse = {
  __typename?: 'FollowResponse';
  errors?: Maybe<Array<FieldError>>;
  follow?: Maybe<Follow>;
};

export type GetRelationInfoResponse = {
  __typename?: 'GetRelationInfoResponse';
  isFollowing: Scalars['Boolean'];
  isProfileOwner: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addLike: Scalars['Boolean'];
  changeEmail: UpdateResponse;
  changePassword: UpdateResponse;
  changeUsername: UpdateResponse;
  createPost: PostResponse;
  createReply: ReplyResponse;
  deletePost: Scalars['Boolean'];
  editPost: UpdateResponse;
  editProfile: UpdateResponse;
  follow: FollowResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
  toggleLike: Scalars['Boolean'];
  togglePostLock: Array<Scalars['String']>;
  unfollow: Scalars['Boolean'];
};


export type MutationAddLikeArgs = {
  id: Scalars['Float'];
};


export type MutationChangeEmailArgs = {
  newEmail: Scalars['String'];
  password: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  oldPassword: Scalars['String'];
};


export type MutationChangeUsernameArgs = {
  newUsername: Scalars['String'];
  password: Scalars['String'];
};


export type MutationCreatePostArgs = {
  options: CreatePostInput;
};


export type MutationCreateReplyArgs = {
  pid: Scalars['Float'];
  text: Scalars['String'];
};


export type MutationDeletePostArgs = {
  pid: Scalars['Float'];
};


export type MutationEditPostArgs = {
  description: Scalars['String'];
  id: Scalars['Float'];
};


export type MutationEditProfileArgs = {
  avatar: Scalars['String'];
  banner: Scalars['String'];
  bio: Scalars['String'];
  displayName: Scalars['String'];
};


export type MutationFollowArgs = {
  tid: Scalars['Float'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameEmail: Scalars['String'];
};


export type MutationRegisterArgs = {
  options: UserRegisterInput;
};


export type MutationToggleLikeArgs = {
  id: Scalars['Float'];
};


export type MutationTogglePostLockArgs = {
  id: Scalars['Float'];
};


export type MutationUnfollowArgs = {
  tid: Scalars['Float'];
};

export type Post = {
  __typename?: 'Post';
  author: User;
  authorId: Scalars['Int'];
  createdAt: Scalars['String'];
  description: Scalars['String'];
  flags?: Maybe<Array<Scalars['String']>>;
  id: Scalars['Int'];
  image: Scalars['String'];
  likeCount: Scalars['Int'];
  likedBy?: Maybe<Array<User>>;
  replies?: Maybe<Array<Reply>>;
  replyCount: Scalars['Int'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type PostResponse = {
  __typename?: 'PostResponse';
  errors?: Maybe<Array<FieldError>>;
  post?: Maybe<Post>;
};

export type Query = {
  __typename?: 'Query';
  canReply: Scalars['Boolean'];
  currentUser?: Maybe<User>;
  currentUserPosts: Array<Post>;
  followingWall?: Maybe<Array<Post>>;
  follows: Array<Follow>;
  getRelationInfo: GetRelationInfoResponse;
  post?: Maybe<Post>;
  posts: Array<Post>;
  replies: Array<Reply>;
  searchPost?: Maybe<Array<Post>>;
  specificUsersPosts: Array<Post>;
  testQuery: Scalars['String'];
  testQueryTwo: Scalars['String'];
  topPosts?: Maybe<Array<Post>>;
  userByUsername?: Maybe<User>;
  users: Array<User>;
};


export type QueryGetRelationInfoArgs = {
  id: Scalars['Float'];
};


export type QueryPostArgs = {
  id: Scalars['Float'];
};


export type QuerySearchPostArgs = {
  query: Scalars['String'];
};


export type QuerySpecificUsersPostsArgs = {
  uid: Scalars['Float'];
};


export type QueryUserByUsernameArgs = {
  username: Scalars['String'];
};

export type Reply = {
  __typename?: 'Reply';
  author: User;
  authorId: Scalars['Int'];
  createdAt: Scalars['String'];
  flags?: Maybe<Array<Scalars['String']>>;
  id: Scalars['Int'];
  likeCount: Scalars['Int'];
  post: Post;
  postId: Scalars['Int'];
  text: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type ReplyResponse = {
  __typename?: 'ReplyResponse';
  errors?: Maybe<Array<FieldError>>;
  reply?: Maybe<Reply>;
};

export type UpdateResponse = {
  __typename?: 'UpdateResponse';
  changed?: Maybe<Scalars['Boolean']>;
  errors?: Maybe<Array<FieldError>>;
};

export type User = {
  __typename?: 'User';
  avatar: Scalars['String'];
  banner: Scalars['String'];
  bio?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  dateOfBirth: Scalars['String'];
  displayName: Scalars['String'];
  email: Scalars['String'];
  flags?: Maybe<Array<Scalars['String']>>;
  followerCount: Scalars['Int'];
  followers?: Maybe<Array<Follow>>;
  following?: Maybe<Array<Follow>>;
  followingCount: Scalars['Int'];
  id: Scalars['Int'];
  likeCount: Scalars['Int'];
  likedPosts?: Maybe<Array<Post>>;
  likedPostsIds?: Maybe<Array<Scalars['Int']>>;
  loggedinAt: Scalars['String'];
  postCount: Scalars['Int'];
  posts?: Maybe<Array<Post>>;
  replies?: Maybe<Array<Reply>>;
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type UserRegisterInput = {
  dateOfBirth: Scalars['String'];
  displayName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type CommonErrorFragment = { __typename?: 'FieldError', field: string, message: string };

export type CommonUserFragment = { __typename?: 'User', id: number, username: string, displayName: string, avatar: string };

export type ChangeEmailMutationVariables = Exact<{
  newEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type ChangeEmailMutation = { __typename?: 'Mutation', changeEmail: { __typename?: 'UpdateResponse', changed?: boolean | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type ChangePasswordMutationVariables = Exact<{
  oldPassword: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'UpdateResponse', changed?: boolean | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type ChangeUsernameMutationVariables = Exact<{
  newUsername: Scalars['String'];
  password: Scalars['String'];
}>;


export type ChangeUsernameMutation = { __typename?: 'Mutation', changeUsername: { __typename?: 'UpdateResponse', changed?: boolean | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type CreatePostMutationVariables = Exact<{
  options: CreatePostInput;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'PostResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, post?: { __typename?: 'Post', id: number, title: string, image: string, description: string } | null } };

export type CreateReplyMutationVariables = Exact<{
  pid: Scalars['Float'];
  text: Scalars['String'];
}>;


export type CreateReplyMutation = { __typename?: 'Mutation', createReply: { __typename?: 'ReplyResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, reply?: { __typename?: 'Reply', id: number, text: string, likeCount: number, createdAt: string, author: { __typename?: 'User', id: number, username: string, displayName: string, avatar: string } } | null } };

export type DeletePostMutationVariables = Exact<{
  pid: Scalars['Float'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost: boolean };

export type EditProfileMutationVariables = Exact<{
  avatar: Scalars['String'];
  banner: Scalars['String'];
  bio: Scalars['String'];
  displayName: Scalars['String'];
}>;


export type EditProfileMutation = { __typename?: 'Mutation', editProfile: { __typename?: 'UpdateResponse', changed?: boolean | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type FollowMutationVariables = Exact<{
  tid: Scalars['Float'];
}>;


export type FollowMutation = { __typename?: 'Mutation', follow: { __typename?: 'FollowResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, follow?: { __typename?: 'Follow', userId: number, followingId: number } | null } };

export type LoginMutationVariables = Exact<{
  usernameEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, username: string, displayName: string, avatar: string } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  options: UserRegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, username: string, displayName: string, avatar: string } | null } };

export type ToggleLikeMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type ToggleLikeMutation = { __typename?: 'Mutation', toggleLike: boolean };

export type TogglePostLockMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type TogglePostLockMutation = { __typename?: 'Mutation', togglePostLock: Array<string> };

export type UnfollowMutationVariables = Exact<{
  tid: Scalars['Float'];
}>;


export type UnfollowMutation = { __typename?: 'Mutation', unfollow: boolean };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', currentUser?: { __typename?: 'User', flags?: Array<string> | null, id: number, username: string, displayName: string, avatar: string, likedPosts?: Array<{ __typename?: 'Post', id: number }> | null } | null };

export type GetFollowingWallQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFollowingWallQuery = { __typename?: 'Query', followingWall?: Array<{ __typename?: 'Post', id: number, title: string, image: string, description: string, likeCount: number, replyCount: number, createdAt: string, author: { __typename?: 'User', id: number, username: string, displayName: string, avatar: string } }> | null };

export type GetPostQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type GetPostQuery = { __typename?: 'Query', post?: { __typename?: 'Post', id: number, title: string, image: string, description: string, replyCount: number, flags?: Array<string> | null, likeCount: number, createdAt: string, updatedAt: string, replies?: Array<{ __typename?: 'Reply', id: number, text: string, likeCount: number, createdAt: string, author: { __typename?: 'User', id: number, username: string, displayName: string, avatar: string } }> | null, author: { __typename?: 'User', id: number, username: string, displayName: string, avatar: string } } | null };

export type GetRelationInfoQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type GetRelationInfoQuery = { __typename?: 'Query', getRelationInfo: { __typename?: 'GetRelationInfoResponse', isFollowing: boolean, isProfileOwner: boolean } };

export type GetSettingsPageInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSettingsPageInfoQuery = { __typename?: 'Query', currentUser?: { __typename?: 'User', email: string, postCount: number, createdAt: string, id: number, username: string, displayName: string, avatar: string } | null };

export type GetTopPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTopPostsQuery = { __typename?: 'Query', topPosts?: Array<{ __typename?: 'Post', id: number, title: string, image: string, description: string, replyCount: number, likeCount: number, createdAt: string, author: { __typename?: 'User', id: number, username: string, displayName: string, avatar: string }, likedBy?: Array<{ __typename?: 'User', id: number }> | null }> | null };

export type GetUserLikedPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserLikedPostsQuery = { __typename?: 'Query', currentUser?: { __typename?: 'User', likedPosts?: Array<{ __typename?: 'Post', id: number }> | null } | null };

export type GetUserProfileQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type GetUserProfileQuery = { __typename?: 'Query', userByUsername?: { __typename?: 'User', id: number, username: string, displayName: string, avatar: string, banner: string, bio?: string | null, postCount: number, followerCount: number, followingCount: number, createdAt: string, posts?: Array<{ __typename?: 'Post', id: number, title: string, image: string, description: string, replyCount: number, likeCount: number, createdAt: string }> | null } | null };

export type SearchForPostQueryVariables = Exact<{
  query: Scalars['String'];
}>;


export type SearchForPostQuery = { __typename?: 'Query', searchPost?: Array<{ __typename?: 'Post', id: number, title: string, image: string, description: string, likeCount: number, replyCount: number, createdAt: string, author: { __typename?: 'User', id: number, username: string, displayName: string, avatar: string } }> | null };

export type GetFlagsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFlagsQuery = { __typename?: 'Query', currentUser?: { __typename?: 'User', id: number, flags?: Array<string> | null } | null };

export const CommonErrorFragmentDoc = gql`
    fragment CommonError on FieldError {
  field
  message
}
    `;
export const CommonUserFragmentDoc = gql`
    fragment CommonUser on User {
  id
  username
  displayName
  avatar
}
    `;
export const ChangeEmailDocument = gql`
    mutation ChangeEmail($newEmail: String!, $password: String!) {
  changeEmail(newEmail: $newEmail, password: $password) {
    errors {
      field
      message
    }
    changed
  }
}
    `;
export type ChangeEmailMutationFn = Apollo.MutationFunction<ChangeEmailMutation, ChangeEmailMutationVariables>;

/**
 * __useChangeEmailMutation__
 *
 * To run a mutation, you first call `useChangeEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeEmailMutation, { data, loading, error }] = useChangeEmailMutation({
 *   variables: {
 *      newEmail: // value for 'newEmail'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useChangeEmailMutation(baseOptions?: Apollo.MutationHookOptions<ChangeEmailMutation, ChangeEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeEmailMutation, ChangeEmailMutationVariables>(ChangeEmailDocument, options);
      }
export type ChangeEmailMutationHookResult = ReturnType<typeof useChangeEmailMutation>;
export type ChangeEmailMutationResult = Apollo.MutationResult<ChangeEmailMutation>;
export type ChangeEmailMutationOptions = Apollo.BaseMutationOptions<ChangeEmailMutation, ChangeEmailMutationVariables>;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($oldPassword: String!, $newPassword: String!) {
  changePassword(oldPassword: $oldPassword, newPassword: $newPassword) {
    errors {
      field
      message
    }
    changed
  }
}
    `;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      oldPassword: // value for 'oldPassword'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const ChangeUsernameDocument = gql`
    mutation ChangeUsername($newUsername: String!, $password: String!) {
  changeUsername(newUsername: $newUsername, password: $password) {
    errors {
      ...CommonError
    }
    changed
  }
}
    ${CommonErrorFragmentDoc}`;
export type ChangeUsernameMutationFn = Apollo.MutationFunction<ChangeUsernameMutation, ChangeUsernameMutationVariables>;

/**
 * __useChangeUsernameMutation__
 *
 * To run a mutation, you first call `useChangeUsernameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeUsernameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeUsernameMutation, { data, loading, error }] = useChangeUsernameMutation({
 *   variables: {
 *      newUsername: // value for 'newUsername'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useChangeUsernameMutation(baseOptions?: Apollo.MutationHookOptions<ChangeUsernameMutation, ChangeUsernameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeUsernameMutation, ChangeUsernameMutationVariables>(ChangeUsernameDocument, options);
      }
export type ChangeUsernameMutationHookResult = ReturnType<typeof useChangeUsernameMutation>;
export type ChangeUsernameMutationResult = Apollo.MutationResult<ChangeUsernameMutation>;
export type ChangeUsernameMutationOptions = Apollo.BaseMutationOptions<ChangeUsernameMutation, ChangeUsernameMutationVariables>;
export const CreatePostDocument = gql`
    mutation CreatePost($options: CreatePostInput!) {
  createPost(options: $options) {
    errors {
      field
      message
    }
    post {
      id
      title
      image
      description
    }
  }
}
    `;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const CreateReplyDocument = gql`
    mutation CreateReply($pid: Float!, $text: String!) {
  createReply(pid: $pid, text: $text) {
    errors {
      ...CommonError
    }
    reply {
      id
      text
      author {
        id
        username
        displayName
        avatar
      }
      likeCount
      createdAt
    }
  }
}
    ${CommonErrorFragmentDoc}`;
export type CreateReplyMutationFn = Apollo.MutationFunction<CreateReplyMutation, CreateReplyMutationVariables>;

/**
 * __useCreateReplyMutation__
 *
 * To run a mutation, you first call `useCreateReplyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateReplyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createReplyMutation, { data, loading, error }] = useCreateReplyMutation({
 *   variables: {
 *      pid: // value for 'pid'
 *      text: // value for 'text'
 *   },
 * });
 */
export function useCreateReplyMutation(baseOptions?: Apollo.MutationHookOptions<CreateReplyMutation, CreateReplyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateReplyMutation, CreateReplyMutationVariables>(CreateReplyDocument, options);
      }
export type CreateReplyMutationHookResult = ReturnType<typeof useCreateReplyMutation>;
export type CreateReplyMutationResult = Apollo.MutationResult<CreateReplyMutation>;
export type CreateReplyMutationOptions = Apollo.BaseMutationOptions<CreateReplyMutation, CreateReplyMutationVariables>;
export const DeletePostDocument = gql`
    mutation DeletePost($pid: Float!) {
  deletePost(pid: $pid)
}
    `;
export type DeletePostMutationFn = Apollo.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      pid: // value for 'pid'
 *   },
 * });
 */
export function useDeletePostMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, options);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
export const EditProfileDocument = gql`
    mutation EditProfile($avatar: String!, $banner: String!, $bio: String!, $displayName: String!) {
  editProfile(
    avatar: $avatar
    banner: $banner
    bio: $bio
    displayName: $displayName
  ) {
    errors {
      ...CommonError
    }
    changed
  }
}
    ${CommonErrorFragmentDoc}`;
export type EditProfileMutationFn = Apollo.MutationFunction<EditProfileMutation, EditProfileMutationVariables>;

/**
 * __useEditProfileMutation__
 *
 * To run a mutation, you first call `useEditProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editProfileMutation, { data, loading, error }] = useEditProfileMutation({
 *   variables: {
 *      avatar: // value for 'avatar'
 *      banner: // value for 'banner'
 *      bio: // value for 'bio'
 *      displayName: // value for 'displayName'
 *   },
 * });
 */
export function useEditProfileMutation(baseOptions?: Apollo.MutationHookOptions<EditProfileMutation, EditProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditProfileMutation, EditProfileMutationVariables>(EditProfileDocument, options);
      }
export type EditProfileMutationHookResult = ReturnType<typeof useEditProfileMutation>;
export type EditProfileMutationResult = Apollo.MutationResult<EditProfileMutation>;
export type EditProfileMutationOptions = Apollo.BaseMutationOptions<EditProfileMutation, EditProfileMutationVariables>;
export const FollowDocument = gql`
    mutation Follow($tid: Float!) {
  follow(tid: $tid) {
    errors {
      ...CommonError
    }
    follow {
      userId
      followingId
    }
  }
}
    ${CommonErrorFragmentDoc}`;
export type FollowMutationFn = Apollo.MutationFunction<FollowMutation, FollowMutationVariables>;

/**
 * __useFollowMutation__
 *
 * To run a mutation, you first call `useFollowMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFollowMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [followMutation, { data, loading, error }] = useFollowMutation({
 *   variables: {
 *      tid: // value for 'tid'
 *   },
 * });
 */
export function useFollowMutation(baseOptions?: Apollo.MutationHookOptions<FollowMutation, FollowMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FollowMutation, FollowMutationVariables>(FollowDocument, options);
      }
export type FollowMutationHookResult = ReturnType<typeof useFollowMutation>;
export type FollowMutationResult = Apollo.MutationResult<FollowMutation>;
export type FollowMutationOptions = Apollo.BaseMutationOptions<FollowMutation, FollowMutationVariables>;
export const LoginDocument = gql`
    mutation Login($usernameEmail: String!, $password: String!) {
  login(usernameEmail: $usernameEmail, password: $password) {
    errors {
      ...CommonError
    }
    user {
      ...CommonUser
    }
  }
}
    ${CommonErrorFragmentDoc}
${CommonUserFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      usernameEmail: // value for 'usernameEmail'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($options: UserRegisterInput!) {
  register(options: $options) {
    errors {
      ...CommonError
    }
    user {
      ...CommonUser
    }
  }
}
    ${CommonErrorFragmentDoc}
${CommonUserFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const ToggleLikeDocument = gql`
    mutation ToggleLike($id: Float!) {
  toggleLike(id: $id)
}
    `;
export type ToggleLikeMutationFn = Apollo.MutationFunction<ToggleLikeMutation, ToggleLikeMutationVariables>;

/**
 * __useToggleLikeMutation__
 *
 * To run a mutation, you first call `useToggleLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleLikeMutation, { data, loading, error }] = useToggleLikeMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useToggleLikeMutation(baseOptions?: Apollo.MutationHookOptions<ToggleLikeMutation, ToggleLikeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ToggleLikeMutation, ToggleLikeMutationVariables>(ToggleLikeDocument, options);
      }
export type ToggleLikeMutationHookResult = ReturnType<typeof useToggleLikeMutation>;
export type ToggleLikeMutationResult = Apollo.MutationResult<ToggleLikeMutation>;
export type ToggleLikeMutationOptions = Apollo.BaseMutationOptions<ToggleLikeMutation, ToggleLikeMutationVariables>;
export const TogglePostLockDocument = gql`
    mutation TogglePostLock($id: Float!) {
  togglePostLock(id: $id)
}
    `;
export type TogglePostLockMutationFn = Apollo.MutationFunction<TogglePostLockMutation, TogglePostLockMutationVariables>;

/**
 * __useTogglePostLockMutation__
 *
 * To run a mutation, you first call `useTogglePostLockMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTogglePostLockMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [togglePostLockMutation, { data, loading, error }] = useTogglePostLockMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTogglePostLockMutation(baseOptions?: Apollo.MutationHookOptions<TogglePostLockMutation, TogglePostLockMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TogglePostLockMutation, TogglePostLockMutationVariables>(TogglePostLockDocument, options);
      }
export type TogglePostLockMutationHookResult = ReturnType<typeof useTogglePostLockMutation>;
export type TogglePostLockMutationResult = Apollo.MutationResult<TogglePostLockMutation>;
export type TogglePostLockMutationOptions = Apollo.BaseMutationOptions<TogglePostLockMutation, TogglePostLockMutationVariables>;
export const UnfollowDocument = gql`
    mutation Unfollow($tid: Float!) {
  unfollow(tid: $tid)
}
    `;
export type UnfollowMutationFn = Apollo.MutationFunction<UnfollowMutation, UnfollowMutationVariables>;

/**
 * __useUnfollowMutation__
 *
 * To run a mutation, you first call `useUnfollowMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnfollowMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unfollowMutation, { data, loading, error }] = useUnfollowMutation({
 *   variables: {
 *      tid: // value for 'tid'
 *   },
 * });
 */
export function useUnfollowMutation(baseOptions?: Apollo.MutationHookOptions<UnfollowMutation, UnfollowMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnfollowMutation, UnfollowMutationVariables>(UnfollowDocument, options);
      }
export type UnfollowMutationHookResult = ReturnType<typeof useUnfollowMutation>;
export type UnfollowMutationResult = Apollo.MutationResult<UnfollowMutation>;
export type UnfollowMutationOptions = Apollo.BaseMutationOptions<UnfollowMutation, UnfollowMutationVariables>;
export const CurrentUserDocument = gql`
    query CurrentUser {
  currentUser {
    ...CommonUser
    likedPosts {
      id
    }
    flags
  }
}
    ${CommonUserFragmentDoc}`;

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
      }
export function useCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
        }
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>;
export type CurrentUserQueryResult = Apollo.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>;
export const GetFollowingWallDocument = gql`
    query GetFollowingWall {
  followingWall {
    id
    title
    image
    description
    author {
      id
      username
      displayName
      avatar
    }
    likeCount
    replyCount
    createdAt
  }
}
    `;

/**
 * __useGetFollowingWallQuery__
 *
 * To run a query within a React component, call `useGetFollowingWallQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFollowingWallQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFollowingWallQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetFollowingWallQuery(baseOptions?: Apollo.QueryHookOptions<GetFollowingWallQuery, GetFollowingWallQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFollowingWallQuery, GetFollowingWallQueryVariables>(GetFollowingWallDocument, options);
      }
export function useGetFollowingWallLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFollowingWallQuery, GetFollowingWallQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFollowingWallQuery, GetFollowingWallQueryVariables>(GetFollowingWallDocument, options);
        }
export type GetFollowingWallQueryHookResult = ReturnType<typeof useGetFollowingWallQuery>;
export type GetFollowingWallLazyQueryHookResult = ReturnType<typeof useGetFollowingWallLazyQuery>;
export type GetFollowingWallQueryResult = Apollo.QueryResult<GetFollowingWallQuery, GetFollowingWallQueryVariables>;
export const GetPostDocument = gql`
    query GetPost($id: Float!) {
  post(id: $id) {
    id
    title
    image
    description
    replies {
      id
      text
      author {
        id
        username
        displayName
        avatar
      }
      likeCount
      createdAt
    }
    replyCount
    author {
      id
      username
      displayName
      avatar
    }
    flags
    likeCount
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetPostQuery__
 *
 * To run a query within a React component, call `useGetPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPostQuery(baseOptions: Apollo.QueryHookOptions<GetPostQuery, GetPostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostQuery, GetPostQueryVariables>(GetPostDocument, options);
      }
export function useGetPostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostQuery, GetPostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostQuery, GetPostQueryVariables>(GetPostDocument, options);
        }
export type GetPostQueryHookResult = ReturnType<typeof useGetPostQuery>;
export type GetPostLazyQueryHookResult = ReturnType<typeof useGetPostLazyQuery>;
export type GetPostQueryResult = Apollo.QueryResult<GetPostQuery, GetPostQueryVariables>;
export const GetRelationInfoDocument = gql`
    query GetRelationInfo($id: Float!) {
  getRelationInfo(id: $id) {
    isFollowing
    isProfileOwner
  }
}
    `;

/**
 * __useGetRelationInfoQuery__
 *
 * To run a query within a React component, call `useGetRelationInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRelationInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRelationInfoQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetRelationInfoQuery(baseOptions: Apollo.QueryHookOptions<GetRelationInfoQuery, GetRelationInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRelationInfoQuery, GetRelationInfoQueryVariables>(GetRelationInfoDocument, options);
      }
export function useGetRelationInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRelationInfoQuery, GetRelationInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRelationInfoQuery, GetRelationInfoQueryVariables>(GetRelationInfoDocument, options);
        }
export type GetRelationInfoQueryHookResult = ReturnType<typeof useGetRelationInfoQuery>;
export type GetRelationInfoLazyQueryHookResult = ReturnType<typeof useGetRelationInfoLazyQuery>;
export type GetRelationInfoQueryResult = Apollo.QueryResult<GetRelationInfoQuery, GetRelationInfoQueryVariables>;
export const GetSettingsPageInfoDocument = gql`
    query GetSettingsPageInfo {
  currentUser {
    ...CommonUser
    email
    postCount
    createdAt
  }
}
    ${CommonUserFragmentDoc}`;

/**
 * __useGetSettingsPageInfoQuery__
 *
 * To run a query within a React component, call `useGetSettingsPageInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSettingsPageInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSettingsPageInfoQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSettingsPageInfoQuery(baseOptions?: Apollo.QueryHookOptions<GetSettingsPageInfoQuery, GetSettingsPageInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSettingsPageInfoQuery, GetSettingsPageInfoQueryVariables>(GetSettingsPageInfoDocument, options);
      }
export function useGetSettingsPageInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSettingsPageInfoQuery, GetSettingsPageInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSettingsPageInfoQuery, GetSettingsPageInfoQueryVariables>(GetSettingsPageInfoDocument, options);
        }
export type GetSettingsPageInfoQueryHookResult = ReturnType<typeof useGetSettingsPageInfoQuery>;
export type GetSettingsPageInfoLazyQueryHookResult = ReturnType<typeof useGetSettingsPageInfoLazyQuery>;
export type GetSettingsPageInfoQueryResult = Apollo.QueryResult<GetSettingsPageInfoQuery, GetSettingsPageInfoQueryVariables>;
export const GetTopPostsDocument = gql`
    query GetTopPosts {
  topPosts {
    id
    title
    image
    description
    replyCount
    author {
      id
      username
      displayName
      avatar
    }
    likedBy {
      id
    }
    likeCount
    createdAt
  }
}
    `;

/**
 * __useGetTopPostsQuery__
 *
 * To run a query within a React component, call `useGetTopPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTopPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTopPostsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTopPostsQuery(baseOptions?: Apollo.QueryHookOptions<GetTopPostsQuery, GetTopPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTopPostsQuery, GetTopPostsQueryVariables>(GetTopPostsDocument, options);
      }
export function useGetTopPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTopPostsQuery, GetTopPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTopPostsQuery, GetTopPostsQueryVariables>(GetTopPostsDocument, options);
        }
export type GetTopPostsQueryHookResult = ReturnType<typeof useGetTopPostsQuery>;
export type GetTopPostsLazyQueryHookResult = ReturnType<typeof useGetTopPostsLazyQuery>;
export type GetTopPostsQueryResult = Apollo.QueryResult<GetTopPostsQuery, GetTopPostsQueryVariables>;
export const GetUserLikedPostsDocument = gql`
    query GetUserLikedPosts {
  currentUser {
    likedPosts {
      id
    }
  }
}
    `;

/**
 * __useGetUserLikedPostsQuery__
 *
 * To run a query within a React component, call `useGetUserLikedPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserLikedPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserLikedPostsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserLikedPostsQuery(baseOptions?: Apollo.QueryHookOptions<GetUserLikedPostsQuery, GetUserLikedPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserLikedPostsQuery, GetUserLikedPostsQueryVariables>(GetUserLikedPostsDocument, options);
      }
export function useGetUserLikedPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserLikedPostsQuery, GetUserLikedPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserLikedPostsQuery, GetUserLikedPostsQueryVariables>(GetUserLikedPostsDocument, options);
        }
export type GetUserLikedPostsQueryHookResult = ReturnType<typeof useGetUserLikedPostsQuery>;
export type GetUserLikedPostsLazyQueryHookResult = ReturnType<typeof useGetUserLikedPostsLazyQuery>;
export type GetUserLikedPostsQueryResult = Apollo.QueryResult<GetUserLikedPostsQuery, GetUserLikedPostsQueryVariables>;
export const GetUserProfileDocument = gql`
    query GetUserProfile($username: String!) {
  userByUsername(username: $username) {
    id
    username
    displayName
    avatar
    banner
    bio
    posts {
      id
      title
      image
      description
      replyCount
      likeCount
      createdAt
    }
    postCount
    followerCount
    followingCount
    createdAt
  }
}
    `;

/**
 * __useGetUserProfileQuery__
 *
 * To run a query within a React component, call `useGetUserProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserProfileQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useGetUserProfileQuery(baseOptions: Apollo.QueryHookOptions<GetUserProfileQuery, GetUserProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserProfileQuery, GetUserProfileQueryVariables>(GetUserProfileDocument, options);
      }
export function useGetUserProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserProfileQuery, GetUserProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserProfileQuery, GetUserProfileQueryVariables>(GetUserProfileDocument, options);
        }
export type GetUserProfileQueryHookResult = ReturnType<typeof useGetUserProfileQuery>;
export type GetUserProfileLazyQueryHookResult = ReturnType<typeof useGetUserProfileLazyQuery>;
export type GetUserProfileQueryResult = Apollo.QueryResult<GetUserProfileQuery, GetUserProfileQueryVariables>;
export const SearchForPostDocument = gql`
    query SearchForPost($query: String!) {
  searchPost(query: $query) {
    id
    title
    image
    description
    author {
      id
      username
      displayName
      avatar
    }
    likeCount
    replyCount
    createdAt
  }
}
    `;

/**
 * __useSearchForPostQuery__
 *
 * To run a query within a React component, call `useSearchForPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchForPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchForPostQuery({
 *   variables: {
 *      query: // value for 'query'
 *   },
 * });
 */
export function useSearchForPostQuery(baseOptions: Apollo.QueryHookOptions<SearchForPostQuery, SearchForPostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchForPostQuery, SearchForPostQueryVariables>(SearchForPostDocument, options);
      }
export function useSearchForPostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchForPostQuery, SearchForPostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchForPostQuery, SearchForPostQueryVariables>(SearchForPostDocument, options);
        }
export type SearchForPostQueryHookResult = ReturnType<typeof useSearchForPostQuery>;
export type SearchForPostLazyQueryHookResult = ReturnType<typeof useSearchForPostLazyQuery>;
export type SearchForPostQueryResult = Apollo.QueryResult<SearchForPostQuery, SearchForPostQueryVariables>;
export const GetFlagsDocument = gql`
    query GetFlags {
  currentUser {
    id
    flags
  }
}
    `;

/**
 * __useGetFlagsQuery__
 *
 * To run a query within a React component, call `useGetFlagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFlagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFlagsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetFlagsQuery(baseOptions?: Apollo.QueryHookOptions<GetFlagsQuery, GetFlagsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFlagsQuery, GetFlagsQueryVariables>(GetFlagsDocument, options);
      }
export function useGetFlagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFlagsQuery, GetFlagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFlagsQuery, GetFlagsQueryVariables>(GetFlagsDocument, options);
        }
export type GetFlagsQueryHookResult = ReturnType<typeof useGetFlagsQuery>;
export type GetFlagsLazyQueryHookResult = ReturnType<typeof useGetFlagsLazyQuery>;
export type GetFlagsQueryResult = Apollo.QueryResult<GetFlagsQuery, GetFlagsQueryVariables>;