import PostCard from "./PostCard";
import { useCurrentUserQuery } from "@/codegen/graphql";
import PostCardSkeleton from "./loading/PostCardSkeleton";
import PostModal from "../postModal/PostModal";

type PostGridProps = {
  posts: {
    __typename?: "Post" | undefined;
    id: number;
    title: string;
    image: string;
    description: string;
    likeCount: number;
    replyCount: number;
    createdAt: string;
  }[];
  username: string;
};

function PostGrid({ posts, username }: PostGridProps) {
  const { data, loading } = useCurrentUserQuery();

  if (loading) return <PostCardSkeleton />;

  return (
    <>
      {posts.map((post, index) => (
        <div key={index} className="group">
          <PostCard
            description={post.description}
            id={post.id}
            image={post.image}
            likeCount={post.likeCount}
            userLikedPosts={data?.currentUser?.likedPosts!}
            replyCount={post.replyCount}
            title={post.title}
            username={username}
          />
        </div>
      ))}
      <PostModal returnHref={`/p/${username}`} />
    </>
  );
}

export default PostGrid;
