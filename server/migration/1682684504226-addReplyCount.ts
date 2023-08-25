import { MigrationInterface, QueryRunner } from "typeorm";

export class addReplyCount1682684504226 implements MigrationInterface {
    name = 'addReplyCount1682684504226'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" ADD "replyCount" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "follower" ADD CONSTRAINT "FK_15b9fc08873ef53ffdb348086ed" FOREIGN KEY ("followingId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "follower" DROP CONSTRAINT "FK_15b9fc08873ef53ffdb348086ed"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "replyCount"`);
    }

}
