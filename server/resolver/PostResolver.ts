import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { Post } from "../entity/Post";
import { AppContext } from "../utils/customTypes";
import { FieldError } from "../utils/FieldError";
import { CreatePostInput } from "../utils/CreatePostInput";
import { UpdateResponse } from "../utils/UpdateResponse";
import { databaseSrc } from "../data-source";
import {
  followRepo,
  postRepo,
  replyRepo,
  userRepo,
} from "../utils/databaseRepos";
import { In } from "typeorm";

@ObjectType()
class PostResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Post, { nullable: true })
  post?: Post;
}

@Resolver()
export class PostResolver {
  /*
    ===========
    | QUERIES |
    ===========
  */

  //Display all posts query. Testing only.
  @Query(() => [Post])
  posts() {
    return postRepo.find({
      relations: {
        author: true,
        replies: true,
      },
      order: { id: "ASC" },
    });
  }

  //Display current user's posts.
  @Query(() => [Post])
  currentUserPosts(@Ctx() { req }: AppContext) {
    //Check for session
    if (!req.session.userId) {
      return null;
    }

    return postRepo.find({
      where: { authorId: req.session.userId },
      relations: {
        author: true,
        replies: true,
      },
      order: { id: "ASC" },
    });
  }

  //Display specific user's posts.
  @Query(() => [Post])
  specificUsersPosts(@Arg("uid") uid: number) {
    return postRepo.find({
      where: { authorId: uid },
      relations: {
        author: true,
        replies: true,
      },
      order: { id: "ASC" },
    });
  }

  //Display specific post
  @Query(() => Post, { nullable: true })
  post(@Arg("id") id: number) {
    return postRepo.findOne({
      where: { id },
      relations: {
        author: true,
        replies: {
          author: true,
        },
        likedBy: true,
      },
    });
  }

  //4 top posts
  @Query(() => [Post], { nullable: true })
  async topPosts() {
    const posts = await postRepo.find({
      order: {
        likeCount: "DESC",
      },
      relations: {
        author: true,
        likedBy: true,
      },
      take: 4,
    });

    return posts;
  }

  //Following Wall
  @Query(() => [Post], { nullable: true })
  async followingWall(@Ctx() { req }: AppContext) {
    console.time("followWall");
    if (!req.session.userId) return null;

    const userFollowing = await followRepo.find({
      where: {
        userId: req.session.userId,
      },
    });

    if (!userFollowing) return null;

    const followingIdArray: number[] = [];

    userFollowing.forEach((e) => followingIdArray.push(e.followingId));

    const posts = await postRepo.find({
      where: {
        authorId: In(followingIdArray),
      },
      relations: {
        author: true,
      },
      order: {
        createdAt: "DESC",
      },
      take: 20,
    });
    console.timeEnd("followWall");

    return posts;
  }

  //Search for posts
  @Query(() => [Post], { nullable: true })
  async searchPost(@Arg("query") query: string) {
    try {
      const posts = await postRepo
        .createQueryBuilder("posts")
        .leftJoinAndSelect("posts.author", "user")
        .where("searchVector @@ plainto_tsquery(:query)", { query })
        .getMany();

      return posts;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  /*
    =============
    | MUTATIONS |
    =============
  */

  //Create post mutation
  @Mutation(() => PostResponse)
  async createPost(
    @Arg("options") options: CreatePostInput,
    @Ctx() { req }: AppContext
  ): Promise<PostResponse> {
    try {
      //Create Post
      const post = await postRepo
        .create({
          title: options.title,
          image: options.image,
          description: options.description,
          authorId: req.session.userId,
          flags: [],
        })
        .save();

      //Update Post Count
      userRepo.increment({ id: req.session.userId }, "postCount", 1);

      return { post };
    } catch (err) {
      console.error(err);

      return {
        errors: [
          {
            field: "error",
            message: "Error creating post.",
          },
        ],
      };
    }
  }

  //Delete post mutation
  @Mutation(() => Boolean)
  async deletePost(
    @Arg("pid") pid: number,
    @Ctx() { req }: AppContext
  ): Promise<Boolean> {
    const postToDelete = await postRepo.findOneBy({ id: pid });

    if (!postToDelete) return false;

    if (postToDelete.authorId !== req.session.userId) return false;

    try {
      await replyRepo.delete({ postId: pid });
      await postRepo.delete({ id: pid });
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  //Edit post mutation
  @Mutation(() => UpdateResponse)
  async editPost(
    @Arg("id") id: number,
    @Arg("description") description: string,
    @Ctx() { req }: AppContext
  ) {
    const post = await postRepo.findOneBy({ id });

    //Check if post exists
    if (!post) {
      return {
        errors: [
          {
            field: "pid",
            message: "Post not found.",
          },
        ],
      };
    }

    //Check if author matches editor
    if (req.session.userId != post.authorId) {
      return {
        errors: [
          {
            field: "pid",
            message: "You do not have permission to edit this post.",
          },
        ],
      };
    }

    //Check if edit period has expired
    const postDate = post.createdAt.getTime();
    const nowDate = Date.now();

    if (nowDate - postDate > 120000) {
      return {
        errors: [
          {
            field: "pid",
            message:
              "The edit period has expired. Post may only be edited within two minutes of posting.",
          },
        ],
      };
    }

    //Try to edit post
    try {
      await databaseSrc
        .createQueryBuilder()
        .update(Post)
        .set({ description })
        .where("id = :id", { id })
        .execute();

      return { changed: true };
    } catch (err) {
      console.log(err);
      return { changed: false };
    }
  }

  //Lock Post
  @Mutation(() => [String] || Boolean)
  async togglePostLock(
    @Arg("id") id: number,
    @Ctx() { req }: AppContext
  ): Promise<string[] | boolean> {
    if (!req.session.userId) return false;

    const post = await postRepo.findOneBy({ id });

    if (!post) return false;

    if (post.authorId !== req.session.userId) return false;

    try {
      const postFlags = post.flags;

      if (postFlags && postFlags.includes("isLocked")) {
        const newFlags = postFlags.filter((flag) => flag !== "isLocked");

        await postRepo.update(
          {
            id,
          },
          {
            flags: newFlags,
          }
        );

        return newFlags;
      } else {
        const newFlags = [...postFlags, "isLocked"];

        await postRepo.update(
          {
            id,
          },
          {
            flags: newFlags,
          }
        );

        return newFlags;
      }
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  @Mutation(() => Boolean)
  async addLike(@Arg("id") id: number, @Ctx() { req }: AppContext) {
    if (!req.session.userId) {
      return false;
    }

    const post = await postRepo.findOneBy({ id });
    const user = await userRepo.findOne({
      where: {
        id: req.session.userId,
      },
      relations: {
        likedPosts: true,
      },
    });

    if (!post || !user) {
      return false;
    }

    try {
      postRepo.increment({ id }, "likeCount", 1);

      const userLikedPosts: Post[] = user.likedPosts;
      user.likedPosts
        ? (user.likedPosts = [...userLikedPosts, post])
        : (user.likedPosts = [post]);
      user.save();
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  @Mutation(() => Boolean)
  async toggleLike(@Arg("id") id: number, @Ctx() { req }: AppContext) {
    if (!req.session.userId) {
      return false;
    }

    const post = await postRepo.findOneBy({ id });
    const user = await userRepo.findOne({
      where: {
        id: req.session.userId,
      },
      relations: {
        likedPosts: true,
      },
    });

    if (!post || !user) {
      return false;
    }

    try {
      const userLikedPosts: Post[] = user.likedPosts;

      if (userLikedPosts.some((p) => p.id === post.id)) {
        //Remove like
        postRepo.decrement({ id }, "likeCount", 1);

        user.likedPosts = userLikedPosts.filter((p) => p.id !== post.id);
        user.save();

        return true;
      } else {
        //Add like
        postRepo.increment({ id }, "likeCount", 1);

        user.likedPosts
          ? (user.likedPosts = [...userLikedPosts, post])
          : (user.likedPosts = [post]);
        user.save();

        return true;
      }
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}
