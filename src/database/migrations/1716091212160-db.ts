import { MigrationInterface, QueryRunner } from "typeorm";

export class Db1716091212160 implements MigrationInterface {
    name = 'Db1716091212160'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "medias" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "medias" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "medias" DROP COLUMN "updatedById"`);
        await queryRunner.query(`ALTER TABLE "medias" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "medias" DROP COLUMN "deletedById"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "medias" ADD "deletedById" integer`);
        await queryRunner.query(`ALTER TABLE "medias" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "medias" ADD "updatedById" integer`);
        await queryRunner.query(`ALTER TABLE "medias" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "medias" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

}
