import { MigrationInterface, QueryRunner } from "typeorm";

export class CompositeUniqueDestination1741362329819 implements MigrationInterface {
    name = 'CompositeUniqueDestination1741362329819'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "destination" ADD CONSTRAINT "UQ_8d452faf11ff631d16440891db8" UNIQUE ("name", "country")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "destination" DROP CONSTRAINT "UQ_8d452faf11ff631d16440891db8"`);
    }

}
