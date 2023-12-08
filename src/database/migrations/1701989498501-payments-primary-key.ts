import { MigrationInterface, QueryRunner } from "typeorm";

export class PaymentsPrimaryKey1701989498501 implements MigrationInterface {
    name = 'PaymentsPrimaryKey1701989498501'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mercado_pago_payment" DROP CONSTRAINT "PK_c93f87b7d0ede2e6d1f042ca6d2"`);
        await queryRunner.query(`ALTER TABLE "mercado_pago_payment" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "mercado_pago_payment" DROP CONSTRAINT "FK_16534965ea2e797004c1f2d6ef5"`);
        await queryRunner.query(`ALTER TABLE "mercado_pago_payment" ADD CONSTRAINT "PK_16534965ea2e797004c1f2d6ef5" PRIMARY KEY ("paymentId")`);
        await queryRunner.query(`ALTER TABLE "mercado_pago_payment" DROP CONSTRAINT "REL_16534965ea2e797004c1f2d6ef"`);
        await queryRunner.query(`ALTER TABLE "mercado_pago_payment" ADD CONSTRAINT "UQ_486f563aed732bca615015c5433" UNIQUE ("url")`);
        await queryRunner.query(`ALTER TABLE "mercado_pago_payment" ADD CONSTRAINT "FK_16534965ea2e797004c1f2d6ef5" FOREIGN KEY ("paymentId") REFERENCES "payment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mercado_pago_payment" DROP CONSTRAINT "FK_16534965ea2e797004c1f2d6ef5"`);
        await queryRunner.query(`ALTER TABLE "mercado_pago_payment" DROP CONSTRAINT "UQ_486f563aed732bca615015c5433"`);
        await queryRunner.query(`ALTER TABLE "mercado_pago_payment" ADD CONSTRAINT "REL_16534965ea2e797004c1f2d6ef" UNIQUE ("paymentId")`);
        await queryRunner.query(`ALTER TABLE "mercado_pago_payment" DROP CONSTRAINT "PK_16534965ea2e797004c1f2d6ef5"`);
        await queryRunner.query(`ALTER TABLE "mercado_pago_payment" ADD CONSTRAINT "FK_16534965ea2e797004c1f2d6ef5" FOREIGN KEY ("paymentId") REFERENCES "payment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mercado_pago_payment" ADD "id" BIGSERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "mercado_pago_payment" ADD CONSTRAINT "PK_c93f87b7d0ede2e6d1f042ca6d2" PRIMARY KEY ("id")`);
    }

}
