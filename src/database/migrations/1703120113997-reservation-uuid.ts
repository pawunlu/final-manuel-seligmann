import { MigrationInterface, QueryRunner } from 'typeorm';

export class ReservationUuid1703120113997 implements MigrationInterface {
  name = 'ReservationUuid1703120113997';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "reservation" ADD "uuid" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "reservation" DROP COLUMN "uuid"`);
  }
}
