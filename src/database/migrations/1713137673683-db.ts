import { MigrationInterface, QueryRunner } from "typeorm";

export class Db1713137673683 implements MigrationInterface {
    name = 'Db1713137673683'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "postLikes" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "createdById" integer, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedById" integer, "deletedAt" TIMESTAMP, "deletedById" integer, "id" SERIAL NOT NULL, "content" integer NOT NULL DEFAULT '1', "userId" integer NOT NULL, "postId" integer NOT NULL, CONSTRAINT "PK_29f4abfe59a4ba82c8371037a20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "postLikes" ADD CONSTRAINT "FK_d3a2b7367faf9b6bcf2428a2883" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "postLikes" ADD CONSTRAINT "FK_26b3ed62ec22e48b9be15663ab0" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "postLikes" DROP CONSTRAINT "FK_26b3ed62ec22e48b9be15663ab0"`);
        await queryRunner.query(`ALTER TABLE "postLikes" DROP CONSTRAINT "FK_d3a2b7367faf9b6bcf2428a2883"`);
        await queryRunner.query(`DROP TABLE "postLikes"`);
    }

}
