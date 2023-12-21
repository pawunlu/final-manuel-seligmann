import { MigrationInterface, QueryRunner } from 'typeorm';

export class ReservationPaymentRelation1703106712945
  implements MigrationInterface
{
  name = 'ReservationPaymentRelation1703106712945';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "reservation" ADD "paymentId" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "reservation" ADD CONSTRAINT "UQ_66f3317f7c28a8507ad8580540f" UNIQUE ("paymentId")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "reservation" DROP CONSTRAINT "UQ_66f3317f7c28a8507ad8580540f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reservation" DROP COLUMN "paymentId"`,
    );
  }
}
