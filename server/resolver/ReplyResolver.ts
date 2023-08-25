import { Reply } from "../entity/Reply";
import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { FieldError } from "../utils/FieldError";
import { AppContext } from "../utils/customTypes";
import { postRepo, replyRepo } from "../utils/databaseRepos";

@ObjectType()
class ReplyResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Reply, { nullable: true })
  reply?: Reply;
}

@Resolver()
export class ReplyResolver {
  /*
    ===========
    | QUERIES |
    ===========
  */

  //Display all replies query. Testing only.
  @Query(() => [Reply])
  replies() {
    return replyRepo.find({
      relations: {
        author: true,
        post: true,
      },
      order: { id: "ASC" },
    });
  }

  /*
    =============
    | MUTATIONS |
    =============
  */

  //Create reply mutation
  @Mutation(() => ReplyResponse)
  async createReply(
    @Arg("pid") pid: number,
    @Arg("text") text: string,
    @Ctx() { req }: AppContext
  ) {
    if (!req.session.userId) {
      return {
        errors: [
          {
            field: "uid",
            message: "Error sending reply. Not logged in.",
          },
        ],
      };
    }

    const post = await postRepo.findOneBy({ id: pid });

    if (!post) {
      return {
        errors: [
          {
            field: "pid",
            message: "Error sending reply. Post not found.",
          },
        ],
      };
    }

    try {
      const reply = await replyRepo
        .create({
          text,
          authorId: req.session.userId,
          postId: pid,
        })
        .save();

      const replyWithRelation = await replyRepo.findOne({
        where: {
          id: reply.id,
        },
        relations: {
          author: true,
        },
      });

      postRepo.increment({ id: pid }, "replyCount", 1);

      return { reply: replyWithRelation };
    } catch (err) {
      console.error(err);
      return {
        errors: [
          {
            field: "error",
            message: "Error sending reply. Internal server error.",
          },
        ],
      };
    }
  }
}
