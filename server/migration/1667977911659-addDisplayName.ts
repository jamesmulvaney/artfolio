import { MigrationInterface, QueryRunner } from "typeorm";

export class addDisplayName1667977911659 implements MigrationInterface {
  name = "addDisplayName1667977911659";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD "displayName" text`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "displayName"`);
  }
}
