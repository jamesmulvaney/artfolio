import {MigrationInterface, QueryRunner} from "typeorm";

export class AddFollowSystem1665191357529 implements MigrationInterface {
    name = 'AddFollowSystem1665191357529'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "follower" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "isFollowingId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "followingId" integer, CONSTRAINT "PK_69e733c097e58ee41a00ccb02d5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "follower" ADD CONSTRAINT "FK_6fe328c3c08b70a5c9c79348839" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "follower" ADD CONSTRAINT "FK_15b9fc08873ef53ffdb348086ed" FOREIGN KEY ("followingId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "follower" DROP CONSTRAINT "FK_15b9fc08873ef53ffdb348086ed"`);
        await queryRunner.query(`ALTER TABLE "follower" DROP CONSTRAINT "FK_6fe328c3c08b70a5c9c79348839"`);
        await queryRunner.query(`DROP TABLE "follower"`);
    }

}
