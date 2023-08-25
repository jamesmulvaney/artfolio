import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

/*
Log Table 
*/
@ObjectType()
@Entity("logs")
export class Log extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column("text", { nullable: false })
  action: string;

  @Field()
  @Column("text", { nullable: false })
  author: string;

  @Field()
  @Column("text")
  victim: string;

  @Field()
  @Column("text")
  description: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
