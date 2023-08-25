import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Follow } from "./Follow";
import { Post } from "./Post";
import { Reply } from "./Reply";

/*
User Table
*/
@ObjectType()
@Entity("users")
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column("text", { nullable: false, unique: true })
  email: string;

  @Field()
  @Column("text", { nullable: false, unique: true })
  username: string;

  @Field()
  @Column("text", { nullable: false })
  displayName: string;

  @Column("text", { nullable: false })
  password: string;

  @Field()
  @Column("date", { nullable: false })
  dateOfBirth: string;

  @Field()
  @Column("text", { nullable: false })
  avatar: string;

  @Field()
  @Column("text", { nullable: true })
  banner: string;

  @Field({ nullable: true })
  @Column("text", { nullable: true })
  bio: string;

  //Posts
  @Field(() => [Post], { nullable: true })
  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];

  @Field(() => Int)
  @Column({ default: 0 })
  postCount: number;

  //Replies
  @Field(() => [Reply], { nullable: true })
  @OneToMany(() => Reply, (reply) => reply.author)
  replies: Reply[];

  //Followers
  @Field(() => [Follow], { nullable: true })
  @OneToMany(() => Follow, (follow) => follow.following)
  followers: Follow[];

  @Field(() => Int)
  @Column({ default: 0 })
  followerCount: number;

  //Following
  @Field(() => [Follow], { nullable: true })
  @OneToMany(() => Follow, (follow) => follow.user)
  following: Follow[];

  @Field(() => Int)
  @Column({ default: 0 })
  followingCount: number;

  //Liked Posts
  @Field(() => [Int], { nullable: true })
  @Column("integer", { array: true, nullable: true })
  likedPostsIds: number[];

  //One user can have many liked posts. One post can be liked by many users.
  @Field(() => [Post], { nullable: true })
  @ManyToMany(() => Post, (post) => post.likedBy)
  @JoinTable()
  likedPosts: Post[];

  @Field(() => Int)
  @Column({ default: 0 })
  likeCount: number;

  @Field(() => [String], { nullable: true })
  @Column("text", { array: true, nullable: true })
  flags: string[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  loggedinAt: Date;
}
