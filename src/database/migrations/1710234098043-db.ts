import { MigrationInterface, QueryRunner } from 'typeorm';

export class Db1710234098043 implements MigrationInterface {
  name = 'Db1710234098043';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updateAt"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdbyid"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updatedbyid"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "deletedbyid"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "createdById" integer`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "user" ADD "updatedById" integer`);
    await queryRunner.query(`ALTER TABLE "user" ADD "deletedById" integer`);
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "createdAt" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "lastName" SET NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "email" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "password" SET NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phone"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "phone" character varying`);
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "role" SET NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "role" DROP NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phone"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "phone" character varying(15)`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "password" DROP NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "email" character varying(100) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "lastName" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "createdAt" SET DEFAULT ('now'::text)::timestamp(6) with time zone`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "deletedById"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updatedById"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdById"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "deletedbyid" integer`);
    await queryRunner.query(`ALTER TABLE "user" ADD "updatedbyid" integer`);
    await queryRunner.query(`ALTER TABLE "user" ADD "createdbyid" integer`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`,
    );
  }
}
