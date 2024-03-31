import { MigrationInterface, QueryRunner } from "typeorm";

export class Db1711710520088 implements MigrationInterface {
    name = 'Db1711710520088'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" RENAME COLUMN "privacy" TO "type"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" RENAME COLUMN "type" TO "privacy"`);
    }

}
