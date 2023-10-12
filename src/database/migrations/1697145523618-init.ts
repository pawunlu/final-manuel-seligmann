import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1697145523618 implements MigrationInterface {
  name = 'Init1697145523618';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "movie" ("id" BIGSERIAL NOT NULL, "name" character varying NOT NULL, "genre" character varying NOT NULL, "durationInMinutes" numeric NOT NULL, "rated" character varying NOT NULL, "calification" numeric NOT NULL, "sinopsis" character varying NOT NULL, "imageName" character varying NOT NULL, "bannerName" character varying NOT NULL, "trailerUrl" character varying NOT NULL, "isVisible" boolean NOT NULL, "displayInBillboard" boolean NOT NULL, "billboardPositionIndex" integer, "displayInCarousel" boolean NOT NULL, "carouselPositionIndex" integer, "isPremiere" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "room_type" ("id" character varying NOT NULL, "name" character varying NOT NULL, "price" numeric NOT NULL, "isVisible" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_abd0f8a4c8a444a84fa2b343353" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "room" ("id" BIGSERIAL NOT NULL, "name" character varying NOT NULL, "isVisible" boolean NOT NULL, "roomTypeId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c6d46db005d623e691b2fbcba23" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "room_seat" ("id" BIGSERIAL NOT NULL, "coordinateX" smallint NOT NULL, "coordinateY" smallint NOT NULL, "column" character varying NOT NULL, "row" character varying NOT NULL, "roomId" bigint NOT NULL, CONSTRAINT "PK_9e10337479e1d5550e7d4b0a871" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "screening_seat" ("id" BIGSERIAL NOT NULL, "coordinateX" smallint NOT NULL, "coordinateY" smallint NOT NULL, "column" smallint NOT NULL, "row" character varying NOT NULL, "isVisible" boolean NOT NULL, "screeningId" bigint NOT NULL, CONSTRAINT "PK_ec5de30f1c38b4027c414bedbb6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" BIGSERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "isActive" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "screening" ("id" BIGSERIAL NOT NULL, "startsAt" TIMESTAMP NOT NULL, "isVisible" boolean NOT NULL, "cancelledAt" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "movieId" bigint NOT NULL, "languageId" character varying NOT NULL, "roomId" bigint NOT NULL, "roomTypeId" character varying NOT NULL, CONSTRAINT "PK_5111bc526c9133721aeffb9a578" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "reservation" ("id" BIGSERIAL NOT NULL, "isConfirmed" boolean NOT NULL, "clientName" character varying NOT NULL, "clientEmail" character varying NOT NULL, "clientPhone" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "screeningId" bigint, CONSTRAINT "PK_48b1f9922368359ab88e8bfa525" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "payment" ("id" BIGSERIAL NOT NULL, "type" character varying NOT NULL, "amount" numeric NOT NULL, "paidAt" TIMESTAMP NOT NULL, "refundedAt" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "mercado_pago_payment" ("id" BIGSERIAL NOT NULL, "url" character varying NOT NULL, "paymentId" bigint, CONSTRAINT "REL_16534965ea2e797004c1f2d6ef" UNIQUE ("paymentId"), CONSTRAINT "PK_c93f87b7d0ede2e6d1f042ca6d2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "reservation_screening_seat" ("id" BIGSERIAL NOT NULL, "reservationId" bigint, "seatsId" bigint, CONSTRAINT "PK_6535ce35dca4571e466f34b2bc4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "language" ("id" character varying NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cc0a99e710eb3733f6fb42b1d4c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "room" ADD CONSTRAINT "FK_9e55182c47f8ba7a32466131837" FOREIGN KEY ("roomTypeId") REFERENCES "room_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "room_seat" ADD CONSTRAINT "FK_5663d234016afa300db03ea4430" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "screening_seat" ADD CONSTRAINT "FK_4aa29401f8806873063270d23b9" FOREIGN KEY ("screeningId") REFERENCES "screening"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "screening" ADD CONSTRAINT "FK_a84042bef1152d9dbdb1446c811" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "screening" ADD CONSTRAINT "FK_3c500fcc674e67778dd6aacba5f" FOREIGN KEY ("languageId") REFERENCES "language"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "screening" ADD CONSTRAINT "FK_5e1b4993908da2f77939337c42b" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "screening" ADD CONSTRAINT "FK_aaaf2f306e37297ade5609c4a9b" FOREIGN KEY ("roomTypeId") REFERENCES "room_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "reservation" ADD CONSTRAINT "FK_d875a641aba18e7183ed4f2a2c6" FOREIGN KEY ("screeningId") REFERENCES "screening"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "mercado_pago_payment" ADD CONSTRAINT "FK_16534965ea2e797004c1f2d6ef5" FOREIGN KEY ("paymentId") REFERENCES "payment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "reservation_screening_seat" ADD CONSTRAINT "FK_2d3acfc7a28744cf13b77cfbe71" FOREIGN KEY ("reservationId") REFERENCES "reservation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "reservation_screening_seat" ADD CONSTRAINT "FK_e188d44011ec1fb56d3608427d5" FOREIGN KEY ("seatsId") REFERENCES "screening_seat"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "reservation_screening_seat" DROP CONSTRAINT "FK_e188d44011ec1fb56d3608427d5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reservation_screening_seat" DROP CONSTRAINT "FK_2d3acfc7a28744cf13b77cfbe71"`,
    );
    await queryRunner.query(
      `ALTER TABLE "mercado_pago_payment" DROP CONSTRAINT "FK_16534965ea2e797004c1f2d6ef5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reservation" DROP CONSTRAINT "FK_d875a641aba18e7183ed4f2a2c6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "screening" DROP CONSTRAINT "FK_aaaf2f306e37297ade5609c4a9b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "screening" DROP CONSTRAINT "FK_5e1b4993908da2f77939337c42b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "screening" DROP CONSTRAINT "FK_3c500fcc674e67778dd6aacba5f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "screening" DROP CONSTRAINT "FK_a84042bef1152d9dbdb1446c811"`,
    );
    await queryRunner.query(
      `ALTER TABLE "screening_seat" DROP CONSTRAINT "FK_4aa29401f8806873063270d23b9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "room_seat" DROP CONSTRAINT "FK_5663d234016afa300db03ea4430"`,
    );
    await queryRunner.query(
      `ALTER TABLE "room" DROP CONSTRAINT "FK_9e55182c47f8ba7a32466131837"`,
    );
    await queryRunner.query(`DROP TABLE "language"`);
    await queryRunner.query(`DROP TABLE "reservation_screening_seat"`);
    await queryRunner.query(`DROP TABLE "mercado_pago_payment"`);
    await queryRunner.query(`DROP TABLE "payment"`);
    await queryRunner.query(`DROP TABLE "reservation"`);
    await queryRunner.query(`DROP TABLE "screening"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "screening_seat"`);
    await queryRunner.query(`DROP TABLE "room_seat"`);
    await queryRunner.query(`DROP TABLE "room"`);
    await queryRunner.query(`DROP TABLE "room_type"`);
    await queryRunner.query(`DROP TABLE "movie"`);
  }
}
