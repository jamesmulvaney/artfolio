import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import argon2 from "argon2";
import { FieldError } from "../utils/FieldError";
import { User } from "../entity/User";
import { UserRegisterInput } from "../utils/UserRegisterInput";
import { AppContext } from "../utils/customTypes";
import { COOKIE_NAME } from "../const";
import { UpdateResponse } from "../utils/UpdateResponse";
import { databaseSrc } from "../data-source";
import { userRepo } from "../utils/databaseRepos";

//Fix express-session types
declare module "express-session" {
  interface SessionData {
    userId: number;
  }
}

//Response given when a user registers or logs in
@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@ObjectType()
class GetRelationInfoResponse {
  @Field(() => Boolean)
  isFollowing: Boolean;

  @Field(() => Boolean)
  isProfileOwner: Boolean;
}

@Resolver()
export class UserResolver {
  /*
    ===========
    | QUERIES |
    ===========
  */

  //Display all users query. Testing only.
  @Query(() => [User])
  users() {
    return userRepo.find({
      relations: {
        posts: true,
        replies: true,
      },
      order: {
        id: "ASC",
      },
    });
  }

  //Display current user query.
  @Query(() => User, { nullable: true })
  currentUser(@Ctx() { req }: AppContext) {
    //Check for session
    if (!req.session.userId) {
      return null;
    }

    return userRepo.findOne({
      where: { id: req.session.userId },
      relations: {
        posts: true,
        replies: true,
        followers: true,
        following: true,
        likedPosts: true,
      },
    });
  }

  //Display user by username.
  @Query(() => User, { nullable: true })
  async userByUsername(@Arg("username") username: string) {
    const user = await userRepo.findOne({
      where: { username },
      relations: {
        posts: true,
        replies: true,
        followers: true,
        following: true,
      },
      order: {
        posts: {
          id: "ASC",
        },
      },
    });

    return user;
  }

  //canReply
  @Query(() => Boolean)
  async canReply(@Ctx() { req }: AppContext) {
    if (!req.session.userId) {
      return false;
    }

    const user = await userRepo.findOne({ where: { id: req.session.userId } });

    if (user?.flags.includes("isReplyBanned")) {
      return false;
    }

    return true;
  }

  @Query(() => GetRelationInfoResponse)
  async getRelationInfo(
    @Arg("id") id: number,
    @Ctx() { req }: AppContext
  ): Promise<GetRelationInfoResponse> {
    let isFollowing = false;
    let isProfileOwner = false;

    if (!req.session.userId) return { isFollowing, isProfileOwner };

    const user = await userRepo.findOne({
      where: {
        id,
      },
      relations: {
        followers: true,
      },
    });

    if (!user) return { isFollowing, isProfileOwner };

    if (req.session.userId === user.id)
      return { isFollowing, isProfileOwner: true };

    user.followers.forEach((follower) => {
      if (req.session.userId === follower.userId) isFollowing = true;
    });

    return { isFollowing, isProfileOwner };
  }

  /*
    =============
    | MUTATIONS |
    =============
  */

  //Register mutation
  @Mutation(() => UserResponse)
  async register(
    @Arg("options") options: UserRegisterInput,
    @Ctx() { req }: AppContext
  ): Promise<UserResponse> {
    //Hash password
    const hashedPassword = await argon2.hash(options.password);

    let user;
    try {
      const result = await databaseSrc
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
          email: options.email,
          username: options.username.toLowerCase(),
          displayName: options.displayName,
          password: hashedPassword,
          dateOfBirth: options.dateOfBirth,
          avatar: "https://i.imgur.com/LjBtGf7.png",
          banner: "https://i.imgur.com/oVjsHvh.jpg",
          flags: ["notVerified"],
        })
        .returning("*")
        .execute();

      user = result.raw[0];
    } catch (err) {
      //Return a custom error if there is a duplicate entry
      //TODO: check this before attempting to register the user.
      if (err.code === "23505") {
        return {
          errors: [
            {
              field: "username",
              message: "Username already taken.",
            },
          ],
        };
      }
    }

    console.log(user);
    req.session.userId = user.id;

    return { user };
  }

  //Login Mutation
  @Mutation(() => UserResponse)
  async login(
    @Arg("usernameEmail") usernameEmail: string,
    @Arg("password") password: string,
    @Ctx() { req }: AppContext
  ) {
    const error = {
      errors: [
        {
          field: "usernameEmail",
          message: "Incorrect username or password.",
        },
      ],
    };

    //Check if user exists
    const user = await User.findOne(
      usernameEmail.includes("@")
        ? { where: { email: usernameEmail }, relations: ["posts", "replies"] }
        : {
            where: { username: usernameEmail },
            relations: ["posts", "replies"],
          }
    );

    if (!user) {
      return error;
    }

    //Check the supplied password matches
    const checkPassword = await argon2.verify(user.password, password);

    if (!checkPassword) {
      return error;
    }

    //Set session
    req.session.userId = user.id;

    return { user };
  }

  //Logout Mutation
  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: AppContext) {
    return new Promise((resolve) => {
      req.session.destroy((err) => {
        res.clearCookie(COOKIE_NAME);

        if (err) {
          console.error(err);
          resolve(false);
          return;
        }

        resolve(true);
      });
    });
  }

  //Edit profile mutation
  @Mutation(() => UpdateResponse)
  async editProfile(
    @Arg("avatar") avatar: string,
    @Arg("banner") banner: string,
    @Arg("bio") bio: string,
    @Arg("displayName") displayName: string,
    @Ctx() { req }: AppContext
  ) {
    //Check for user
    const user = await userRepo.findOneBy({ id: req.session.userId });

    if (!user) {
      return {
        errors: [
          {
            field: "displayName",
            message: "User not found.",
          },
        ],
      };
    }

    //Try to update profile
    try {
      await userRepo.update(
        { id: user.id },
        { avatar, banner, bio, displayName }
      );

      return { changed: true };
    } catch (err) {
      console.log(err);
      return { changed: false };
    }
  }

  //Change password mutation
  @Mutation(() => UpdateResponse)
  async changePassword(
    @Arg("oldPassword") oldPassword: string,
    @Arg("newPassword") newPassword: string,
    @Ctx() { req }: AppContext
  ): Promise<UpdateResponse> {
    //Check for user
    const user = await User.findOne({ where: { id: req.session.userId } });

    if (!user) {
      return {
        errors: [
          {
            field: "uid",
            message: "User not found.",
          },
        ],
      };
    }

    //Check the supplied password matches
    const checkPassword = await argon2.verify(user.password, oldPassword);

    if (!checkPassword) {
      return {
        errors: [
          {
            field: "oldPassword",
            message: "Password is incorrect.",
          },
        ],
      };
    }

    //Hash password
    const hashedPassword = await argon2.hash(newPassword);

    //Update password
    try {
      await userRepo.update({ id: user.id }, { password: hashedPassword });

      return { changed: true };
    } catch (err) {
      console.log(err);
      return { changed: false };
    }
  }

  //Change username mutation
  @Mutation(() => UpdateResponse)
  async changeUsername(
    @Arg("newUsername") newUsername: string,
    @Arg("password") password: string,
    @Ctx() { req }: AppContext
  ): Promise<UpdateResponse> {
    //Check for user
    const user = await User.findOne({ where: { id: req.session.userId } });

    if (!user) {
      return {
        errors: [
          {
            field: "uid",
            message: "User not found.",
          },
        ],
      };
    }

    //Check if username is taken
    const isUsernameTaken = await User.findOne({
      where: { username: newUsername },
    });

    if (isUsernameTaken) {
      return {
        errors: [
          {
            field: "newUsername",
            message: "Username already in use.",
          },
        ],
      };
    }

    //Check the supplied password matches
    const checkPassword = await argon2.verify(user.password, password);

    if (!checkPassword) {
      return {
        errors: [
          {
            field: "password",
            message: "Password is incorrect.",
          },
        ],
      };
    }

    //Update the username
    try {
      await userRepo.update({ id: user.id }, { username: newUsername });

      return { changed: true };
    } catch (err) {
      console.log(err);
      return { changed: false };
    }
  }

  //Change username mutation
  @Mutation(() => UpdateResponse)
  async changeEmail(
    @Arg("newEmail") newEmail: string,
    @Arg("password") password: string,
    @Ctx() { req }: AppContext
  ): Promise<UpdateResponse> {
    //Check for user
    const user = await User.findOne({ where: { id: req.session.userId } });

    if (!user) {
      return {
        errors: [
          {
            field: "uid",
            message: "User not found.",
          },
        ],
      };
    }

    //Check if email is taken
    const isEmailTaken = await User.findOne({
      where: { email: newEmail },
    });

    if (isEmailTaken) {
      return {
        errors: [
          {
            field: "newEmail",
            message: "Email already in use.",
          },
        ],
      };
    }

    //Check the supplied password matches
    const checkPassword = await argon2.verify(user.password, password);

    if (!checkPassword) {
      return {
        errors: [
          {
            field: "password",
            message: "Password is incorrect.",
          },
        ],
      };
    }

    //Update the email
    try {
      await userRepo.update({ id: user.id }, { email: newEmail });

      return { changed: true };
    } catch (err) {
      console.log(err);
      return { changed: false };
    }
  }
}
