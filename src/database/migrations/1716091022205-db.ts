import { MigrationInterface, QueryRunner } from "typeorm";

export class Db1716091022205 implements MigrationInterface {
    name = 'Db1716091022205'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "medias" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "createdById" integer, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedById" integer, "deletedAt" TIMESTAMP, "deletedById" integer, "id" SERIAL NOT NULL, "file" text NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_f27321557a66cd4fae9bc1ed6e7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "medias" ADD CONSTRAINT "FK_0ca422a52c318ce86181dbf01ed" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "medias" DROP CONSTRAINT "FK_0ca422a52c318ce86181dbf01ed"`);
        await queryRunner.query(`DROP TABLE "medias"`);
    }

}
