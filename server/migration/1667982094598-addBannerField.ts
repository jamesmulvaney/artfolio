import { MigrationInterface, QueryRunner } from "typeorm";

export class addBannerField1667982094598 implements MigrationInterface {
  name = "addBannerField1667982094598";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD "banner" text`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "followerCount" integer NOT NULL DEFAULT '0'`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "followingCount" integer NOT NULL DEFAULT '0'`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "followingCount"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "followerCount"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "banner"`);
  }
}
