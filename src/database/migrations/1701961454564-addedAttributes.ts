import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedAttributes1701961454564 implements MigrationInterface {
  name = 'AddedAttributes1701961454564';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "movie" ALTER COLUMN "displayInBillboard" SET DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie" ALTER COLUMN "displayInCarousel" SET DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie" ALTER COLUMN "isPremiere" SET DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "room_type" ALTER COLUMN "isVisible" SET DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "room" ALTER COLUMN "isVisible" SET DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "screening_seat" ALTER COLUMN "isVisible" SET DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "isActive" SET DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "screening" ALTER COLUMN "isVisible" SET DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "mercado_pago_payment" DROP CONSTRAINT "FK_16534965ea2e797004c1f2d6ef5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "mercado_pago_payment" ALTER COLUMN "paymentId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "mercado_pago_payment" ADD CONSTRAINT "FK_16534965ea2e797004c1f2d6ef5" FOREIGN KEY ("paymentId") REFERENCES "payment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "mercado_pago_payment" DROP CONSTRAINT "FK_16534965ea2e797004c1f2d6ef5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "mercado_pago_payment" ALTER COLUMN "paymentId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "mercado_pago_payment" ADD CONSTRAINT "FK_16534965ea2e797004c1f2d6ef5" FOREIGN KEY ("paymentId") REFERENCES "payment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "screening" ALTER COLUMN "isVisible" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "isActive" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "screening_seat" ALTER COLUMN "isVisible" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "room" ALTER COLUMN "isVisible" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "room_type" ALTER COLUMN "isVisible" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie" ALTER COLUMN "isPremiere" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie" ALTER COLUMN "displayInCarousel" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie" ALTER COLUMN "displayInBillboard" DROP DEFAULT`,
    );
  }
}
