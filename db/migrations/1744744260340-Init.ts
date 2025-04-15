import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1744744260340 implements MigrationInterface {
    name = 'Init1744744260340'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "destination" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "country" character varying NOT NULL, "media" character varying, CONSTRAINT "UQ_8d452faf11ff631d16440891db8" UNIQUE ("name", "country"), CONSTRAINT "PK_e45b5ee5788eb3c7f0ae41746e7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."expense_category_enum" AS ENUM('FOOD', 'TRANSPORTATION', 'ACCOMMODATION', 'MISC')`);
        await queryRunner.query(`CREATE TABLE "expense" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "amount" integer NOT NULL, "description" character varying NOT NULL, "category" "public"."expense_category_enum" NOT NULL, "tripId" integer, CONSTRAINT "PK_edd925b450e13ea36197c9590fc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "trip" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "title" character varying NOT NULL, "startDate" TIMESTAMP NOT NULL, "endDate" TIMESTAMP NOT NULL, "userId" integer, CONSTRAINT "PK_714c23d558208081dbccb9d9268" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "destination_trips_trip" ("destinationId" integer NOT NULL, "tripId" integer NOT NULL, CONSTRAINT "PK_a662e2813e18aa6ca58ae43f72f" PRIMARY KEY ("destinationId", "tripId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_30455d1498dcc891ff14cf58b3" ON "destination_trips_trip" ("destinationId") `);
        await queryRunner.query(`CREATE INDEX "IDX_fe5e0b7086fd20e12e2ef25f7b" ON "destination_trips_trip" ("tripId") `);
        await queryRunner.query(`ALTER TABLE "expense" ADD CONSTRAINT "FK_8ec922ab8fb06e5553e52c6664f" FOREIGN KEY ("tripId") REFERENCES "trip"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "trip" ADD CONSTRAINT "FK_f89812be41bd7d29f98d43445ee" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "destination_trips_trip" ADD CONSTRAINT "FK_30455d1498dcc891ff14cf58b3a" FOREIGN KEY ("destinationId") REFERENCES "destination"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "destination_trips_trip" ADD CONSTRAINT "FK_fe5e0b7086fd20e12e2ef25f7b0" FOREIGN KEY ("tripId") REFERENCES "trip"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "destination_trips_trip" DROP CONSTRAINT "FK_fe5e0b7086fd20e12e2ef25f7b0"`);
        await queryRunner.query(`ALTER TABLE "destination_trips_trip" DROP CONSTRAINT "FK_30455d1498dcc891ff14cf58b3a"`);
        await queryRunner.query(`ALTER TABLE "trip" DROP CONSTRAINT "FK_f89812be41bd7d29f98d43445ee"`);
        await queryRunner.query(`ALTER TABLE "expense" DROP CONSTRAINT "FK_8ec922ab8fb06e5553e52c6664f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fe5e0b7086fd20e12e2ef25f7b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_30455d1498dcc891ff14cf58b3"`);
        await queryRunner.query(`DROP TABLE "destination_trips_trip"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "trip"`);
        await queryRunner.query(`DROP TABLE "expense"`);
        await queryRunner.query(`DROP TYPE "public"."expense_category_enum"`);
        await queryRunner.query(`DROP TABLE "destination"`);
    }

}
