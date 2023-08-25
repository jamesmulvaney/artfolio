import {MigrationInterface, QueryRunner} from "typeorm";

export class addDisplayName1667978205111 implements MigrationInterface {
    name = 'addDisplayName1667978205111'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "displayName" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "displayName" DROP NOT NULL`);
    }

}
