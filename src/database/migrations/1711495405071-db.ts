import { MigrationInterface, QueryRunner } from "typeorm";

export class Db1711495405071 implements MigrationInterface {
    name = 'Db1711495405071'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "comments" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "createdById" integer, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedById" integer, "deletedAt" TIMESTAMP, "deletedById" integer, "id" SERIAL NOT NULL, "content" text NOT NULL, "imageUrl" text, "status" integer NOT NULL DEFAULT '1', "privacy" integer NOT NULL DEFAULT '1', "parentId" integer, "userId" integer NOT NULL, "postId" integer NOT NULL, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "commentLikes" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "createdById" integer, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedById" integer, "deletedAt" TIMESTAMP, "deletedById" integer, "id" SERIAL NOT NULL, "content" integer NOT NULL DEFAULT '1', "userId" integer NOT NULL, "commentId" integer NOT NULL, CONSTRAINT "PK_1ce9352bedf70e23a403615d9b3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "friends" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "createdById" integer, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedById" integer, "deletedAt" TIMESTAMP, "deletedById" integer, "id" SERIAL NOT NULL, "senderId" integer NOT NULL, "receiverId" integer NOT NULL, "content" text NOT NULL, "imageUrls" text array, "status" integer NOT NULL DEFAULT '1', "privacy" integer NOT NULL DEFAULT '1', "userId" integer NOT NULL, CONSTRAINT "PK_65e1b06a9f379ee5255054021e1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_e44ddaaa6d058cb4092f83ad61f" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "commentLikes" ADD CONSTRAINT "FK_6033b505c173866759868b4445c" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "commentLikes" ADD CONSTRAINT "FK_fe6e01cc43c0e5b920055d47b64" FOREIGN KEY ("commentId") REFERENCES "comments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "friends" ADD CONSTRAINT "FK_0c4c4b18d8a52c580213a40c084" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "friends" DROP CONSTRAINT "FK_0c4c4b18d8a52c580213a40c084"`);
        await queryRunner.query(`ALTER TABLE "commentLikes" DROP CONSTRAINT "FK_fe6e01cc43c0e5b920055d47b64"`);
        await queryRunner.query(`ALTER TABLE "commentLikes" DROP CONSTRAINT "FK_6033b505c173866759868b4445c"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_e44ddaaa6d058cb4092f83ad61f"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749"`);
        await queryRunner.query(`DROP TABLE "friends"`);
        await queryRunner.query(`DROP TABLE "commentLikes"`);
        await queryRunner.query(`DROP TABLE "comments"`);
    }

}
