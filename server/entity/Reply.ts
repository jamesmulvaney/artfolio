import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Post } from "./Post";
import { User } from "./User";

/*
Reply Table
*/
@ObjectType()
@Entity("replies")
export class Reply extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column("text", { nullable: false })
  text: string;

  @Field(() => Int)
  @Column("integer", { nullable: false })
  authorId: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.posts)
  author: User;

  @Field(() => Int)
  @Column("integer", { nullable: false })
  postId: number;

  @Field(() => Post)
  @ManyToOne(() => Post, (post) => post.replies)
  post: Post;

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
}
