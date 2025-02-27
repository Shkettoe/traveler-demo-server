import { MigrationInterface, QueryRunner } from "typeorm";

export class ExpensesTable1740672999387 implements MigrationInterface {
    name = 'ExpensesTable1740672999387'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."expense_category_enum" AS ENUM('FOOD', 'TRANSPORTATION', 'ACCOMMODATION', 'MISC')`);
        await queryRunner.query(`CREATE TABLE "expense" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "amount" integer NOT NULL, "description" character varying NOT NULL, "category" "public"."expense_category_enum" NOT NULL, "tripId" integer, CONSTRAINT "PK_edd925b450e13ea36197c9590fc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "expense" ADD CONSTRAINT "FK_8ec922ab8fb06e5553e52c6664f" FOREIGN KEY ("tripId") REFERENCES "trip"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "expense" DROP CONSTRAINT "FK_8ec922ab8fb06e5553e52c6664f"`);
        await queryRunner.query(`DROP TABLE "expense"`);
        await queryRunner.query(`DROP TYPE "public"."expense_category_enum"`);
    }

}
