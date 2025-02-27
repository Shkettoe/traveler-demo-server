import { MigrationInterface, QueryRunner } from "typeorm";

export class DestinationTable1740669968316 implements MigrationInterface {
    name = 'DestinationTable1740669968316'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "destination" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "country" character varying NOT NULL, CONSTRAINT "PK_e45b5ee5788eb3c7f0ae41746e7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "destination_trips_trip" ("destinationId" integer NOT NULL, "tripId" integer NOT NULL, CONSTRAINT "PK_a662e2813e18aa6ca58ae43f72f" PRIMARY KEY ("destinationId", "tripId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_30455d1498dcc891ff14cf58b3" ON "destination_trips_trip" ("destinationId") `);
        await queryRunner.query(`CREATE INDEX "IDX_fe5e0b7086fd20e12e2ef25f7b" ON "destination_trips_trip" ("tripId") `);
        await queryRunner.query(`ALTER TABLE "destination_trips_trip" ADD CONSTRAINT "FK_30455d1498dcc891ff14cf58b3a" FOREIGN KEY ("destinationId") REFERENCES "destination"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "destination_trips_trip" ADD CONSTRAINT "FK_fe5e0b7086fd20e12e2ef25f7b0" FOREIGN KEY ("tripId") REFERENCES "trip"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "destination_trips_trip" DROP CONSTRAINT "FK_fe5e0b7086fd20e12e2ef25f7b0"`);
        await queryRunner.query(`ALTER TABLE "destination_trips_trip" DROP CONSTRAINT "FK_30455d1498dcc891ff14cf58b3a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fe5e0b7086fd20e12e2ef25f7b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_30455d1498dcc891ff14cf58b3"`);
        await queryRunner.query(`DROP TABLE "destination_trips_trip"`);
        await queryRunner.query(`DROP TABLE "destination"`);
    }

}
