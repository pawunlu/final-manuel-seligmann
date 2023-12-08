import { MigrationInterface, QueryRunner } from "typeorm";

export class PaymentsPrimaryKey1701995253213 implements MigrationInterface {
    name = 'PaymentsPrimaryKey1701995253213'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mercado_pago_payment" ADD "externalId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "mercado_pago_payment" DROP CONSTRAINT "PK_16534965ea2e797004c1f2d6ef5"`);
        await queryRunner.query(`ALTER TABLE "mercado_pago_payment" ADD CONSTRAINT "PK_80bb31ff293360b60d15d9b58b8" PRIMARY KEY ("paymentId", "externalId")`);
        await queryRunner.query(`ALTER TABLE "payment" ALTER COLUMN "paidAt" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "mercado_pago_payment" DROP CONSTRAINT "FK_16534965ea2e797004c1f2d6ef5"`);
        await queryRunner.query(`ALTER TABLE "mercado_pago_payment" DROP CONSTRAINT "PK_80bb31ff293360b60d15d9b58b8"`);
        await queryRunner.query(`ALTER TABLE "mercado_pago_payment" ADD CONSTRAINT "PK_3aa734cc97e660cdb24fd6f6372" PRIMARY KEY ("externalId")`);
        await queryRunner.query(`ALTER TABLE "mercado_pago_payment" ADD CONSTRAINT "UQ_16534965ea2e797004c1f2d6ef5" UNIQUE ("paymentId")`);
        await queryRunner.query(`ALTER TABLE "mercado_pago_payment" ADD CONSTRAINT "FK_16534965ea2e797004c1f2d6ef5" FOREIGN KEY ("paymentId") REFERENCES "payment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mercado_pago_payment" DROP CONSTRAINT "FK_16534965ea2e797004c1f2d6ef5"`);
        await queryRunner.query(`ALTER TABLE "mercado_pago_payment" DROP CONSTRAINT "UQ_16534965ea2e797004c1f2d6ef5"`);
        await queryRunner.query(`ALTER TABLE "mercado_pago_payment" DROP CONSTRAINT "PK_3aa734cc97e660cdb24fd6f6372"`);
        await queryRunner.query(`ALTER TABLE "mercado_pago_payment" ADD CONSTRAINT "PK_80bb31ff293360b60d15d9b58b8" PRIMARY KEY ("paymentId", "externalId")`);
        await queryRunner.query(`ALTER TABLE "mercado_pago_payment" ADD CONSTRAINT "FK_16534965ea2e797004c1f2d6ef5" FOREIGN KEY ("paymentId") REFERENCES "payment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payment" ALTER COLUMN "paidAt" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "mercado_pago_payment" DROP CONSTRAINT "PK_80bb31ff293360b60d15d9b58b8"`);
        await queryRunner.query(`ALTER TABLE "mercado_pago_payment" ADD CONSTRAINT "PK_16534965ea2e797004c1f2d6ef5" PRIMARY KEY ("paymentId")`);
        await queryRunner.query(`ALTER TABLE "mercado_pago_payment" DROP COLUMN "externalId"`);
    }

}
