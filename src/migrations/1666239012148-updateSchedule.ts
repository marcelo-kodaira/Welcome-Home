import { MigrationInterface, QueryRunner } from "typeorm";

export class updateSchedule1666239012148 implements MigrationInterface {
    name = 'updateSchedule1666239012148'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "properties" DROP CONSTRAINT "FK_7ccdcbf4e4ffdc275fb1eb32957"`);
        await queryRunner.query(`ALTER TABLE "properties" RENAME COLUMN "adressIdId" TO "addressId"`);
        await queryRunner.query(`ALTER TABLE "properties" RENAME CONSTRAINT "UQ_7ccdcbf4e4ffdc275fb1eb32957" TO "UQ_2b2211958ef1f0e3c680339100e"`);
        await queryRunner.query(`CREATE TABLE "addresses" ("id" SERIAL NOT NULL, "district" character varying NOT NULL, "zipCode" character varying NOT NULL, "number" character varying, "city" character varying NOT NULL, "state" character varying NOT NULL, CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "properties" ADD CONSTRAINT "FK_2b2211958ef1f0e3c680339100e" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "properties" DROP CONSTRAINT "FK_2b2211958ef1f0e3c680339100e"`);
        await queryRunner.query(`DROP TABLE "addresses"`);
        await queryRunner.query(`ALTER TABLE "properties" RENAME CONSTRAINT "UQ_2b2211958ef1f0e3c680339100e" TO "UQ_7ccdcbf4e4ffdc275fb1eb32957"`);
        await queryRunner.query(`ALTER TABLE "properties" RENAME COLUMN "addressId" TO "adressIdId"`);
        await queryRunner.query(`ALTER TABLE "properties" ADD CONSTRAINT "FK_7ccdcbf4e4ffdc275fb1eb32957" FOREIGN KEY ("adressIdId") REFERENCES "adresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
