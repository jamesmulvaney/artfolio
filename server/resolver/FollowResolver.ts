import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { AppContext } from "../utils/customTypes";
import { Follow } from "../entity/Follow";
import { FieldError } from "../utils/FieldError";
import { userRepo, followRepo } from "../utils/databaseRepos";

@ObjectType()
class FollowResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Follow, { nullable: true })
  follow?: Follow;
}

@Resolver()
export class FollowResolver {
  /*
    ===========
    | QUERIES |
    ===========
  */

  //Display all replies query. Testing only.
  @Query(() => [Follow])
  follows() {
    return followRepo.find({
      relations: {
        user: true,
        following: true,
      },
      order: { id: "ASC" },
    });
  }

  /*
    =============
    | MUTATIONS |
    =============
  */

  //New Follow mutation
  @Mutation(() => FollowResponse)
  async follow(
    @Arg("tid") tid: number,
    @Ctx() { req }: AppContext
  ): Promise<FollowResponse> {
    if (!req.session.userId) {
      return {
        errors: [
          {
            field: "tid",
            message: "Not Authorized",
          },
        ],
      };
    }

    try {
      const follow = await followRepo
        .create({
          userId: req.session.userId,
          followingId: tid,
        })
        .save();

      userRepo.increment({ id: req.session.userId }, "followingCount", 1);
      userRepo.increment({ id: tid }, "followerCount", 1);

      return { follow };
    } catch (err) {
      console.error(err);
      return {
        errors: [
          {
            field: "tid",
            message: "Unknown Error",
          },
        ],
      };
    }
  }

  @Mutation(() => Boolean)
  async unfollow(
    @Arg("tid") tid: number,
    @Ctx() { req }: AppContext
  ): Promise<Boolean> {
    if (!req.session.userId) {
      return false;
    }

    try {
      await followRepo.delete({ userId: req.session.userId, followingId: tid });

      userRepo.decrement({ id: req.session.userId }, "followingCount", 1);
      userRepo.decrement({ id: tid }, "followerCount", 1);

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}
