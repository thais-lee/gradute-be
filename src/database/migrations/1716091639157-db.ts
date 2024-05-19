import { MigrationInterface, QueryRunner } from "typeorm";

export class Db1716091639157 implements MigrationInterface {
    name = 'Db1716091639157'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "medias" RENAME COLUMN "file" TO "fileUrl"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "medias" RENAME COLUMN "fileUrl" TO "file"`);
    }

}
