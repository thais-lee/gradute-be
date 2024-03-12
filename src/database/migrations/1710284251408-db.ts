import { MigrationInterface, QueryRunner } from 'typeorm';

export class Db1710284251408 implements MigrationInterface {
  name = 'Db1710284251408';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "posts" ADD "imageUrls" text array`);
    await queryRunner.query(`ALTER TABLE "posts" ADD "userId" integer`);
    await queryRunner.query(
      `ALTER TABLE "posts" ADD CONSTRAINT "FK_ae05faaa55c866130abef6e1fee" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "posts" DROP CONSTRAINT "FK_ae05faaa55c866130abef6e1fee"`,
    );
    await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "userId"`);
    await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "imageUrls"`);
  }
}
