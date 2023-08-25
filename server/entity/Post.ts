import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Reply } from "./Reply";
import { User } from "./User";

/*
Post Table
*/
@ObjectType()
@Entity("posts")
export class Post extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column("text", { nullable: false })
  title: string;

  @Field()
  @Column("text", { nullable: false })
  image: string;

  @Field()
  @Column("text", { nullable: false })
  description: string;

  //Replies
  @Field(() => [Reply], { nullable: true })
  @OneToMany(() => Reply, (reply) => reply.post)
  replies: Reply[];

  @Field(() => Int)
  @Column({ default: 0 })
  replyCount: number;

  @Field(() => Int)
  @Column("integer", { nullable: false })
  authorId: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.posts)
  author: User;

  @Field(() => [User], { nullable: true })
  @ManyToMany(() => User, (user) => user.likedPosts)
  likedBy: User[];

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
