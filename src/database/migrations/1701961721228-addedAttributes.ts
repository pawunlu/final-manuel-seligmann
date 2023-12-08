import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedAttributes1701961721228 implements MigrationInterface {
  name = 'AddedAttributes1701961721228';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "reservation" ALTER COLUMN "isConfirmed" SET DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "reservation" ALTER COLUMN "isConfirmed" DROP DEFAULT`,
    );
  }
}
