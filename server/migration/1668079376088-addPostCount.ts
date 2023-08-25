import {MigrationInterface, QueryRunner} from "typeorm";

export class addPostCount1668079376088 implements MigrationInterface {
    name = 'addPostCount1668079376088'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "postCount" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "postCount"`);
    }

}
