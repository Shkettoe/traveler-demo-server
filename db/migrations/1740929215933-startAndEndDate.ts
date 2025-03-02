import { MigrationInterface, QueryRunner } from "typeorm";

export class StartAndEndDate1740929215933 implements MigrationInterface {
    name = 'StartAndEndDate1740929215933'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "trip" ADD "startDate" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "trip" ADD "endDate" TIMESTAMP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "trip" DROP COLUMN "endDate"`);
        await queryRunner.query(`ALTER TABLE "trip" DROP COLUMN "startDate"`);
    }

}
