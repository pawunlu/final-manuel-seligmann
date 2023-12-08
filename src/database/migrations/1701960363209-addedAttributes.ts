import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedAttributes1701960363209 implements MigrationInterface {
  name = 'AddedAttributes1701960363209';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "reservation_screening_seat" DROP CONSTRAINT "FK_e188d44011ec1fb56d3608427d5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reservation_screening_seat" DROP COLUMN "seatsId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reservation_screening_seat" ADD "seatId" bigint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "reservation" DROP CONSTRAINT "FK_d875a641aba18e7183ed4f2a2c6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reservation" ALTER COLUMN "screeningId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "reservation_screening_seat" DROP CONSTRAINT "FK_2d3acfc7a28744cf13b77cfbe71"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reservation_screening_seat" ALTER COLUMN "reservationId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "reservation" ADD CONSTRAINT "FK_d875a641aba18e7183ed4f2a2c6" FOREIGN KEY ("screeningId") REFERENCES "screening"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "reservation_screening_seat" ADD CONSTRAINT "FK_2d3acfc7a28744cf13b77cfbe71" FOREIGN KEY ("reservationId") REFERENCES "reservation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "reservation_screening_seat" ADD CONSTRAINT "FK_3c782ad2a4c3b83071347c224ca" FOREIGN KEY ("seatId") REFERENCES "screening_seat"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "reservation_screening_seat" DROP CONSTRAINT "FK_3c782ad2a4c3b83071347c224ca"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reservation_screening_seat" DROP CONSTRAINT "FK_2d3acfc7a28744cf13b77cfbe71"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reservation" DROP CONSTRAINT "FK_d875a641aba18e7183ed4f2a2c6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reservation_screening_seat" ALTER COLUMN "reservationId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "reservation_screening_seat" ADD CONSTRAINT "FK_2d3acfc7a28744cf13b77cfbe71" FOREIGN KEY ("reservationId") REFERENCES "reservation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "reservation" ALTER COLUMN "screeningId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "reservation" ADD CONSTRAINT "FK_d875a641aba18e7183ed4f2a2c6" FOREIGN KEY ("screeningId") REFERENCES "screening"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "reservation_screening_seat" DROP COLUMN "seatId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reservation_screening_seat" ADD "seatsId" bigint`,
    );
    await queryRunner.query(
      `ALTER TABLE "reservation_screening_seat" ADD CONSTRAINT "FK_e188d44011ec1fb56d3608427d5" FOREIGN KEY ("seatsId") REFERENCES "screening_seat"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
