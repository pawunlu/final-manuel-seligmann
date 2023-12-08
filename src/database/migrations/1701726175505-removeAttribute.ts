import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveAttribute1701726175505 implements MigrationInterface {
    name = 'RemoveAttribute1701726175505'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "isVisible"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" ADD "isVisible" boolean NOT NULL`);
    }

}
