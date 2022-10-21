import { MigrationInterface, QueryRunner } from "typeorm";

export class createProperties1666203687054 implements MigrationInterface {
    name = 'createProperties1666203687054'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedule_users_properties" ADD "propertyIdId" uuid`);
        await queryRunner.query(`ALTER TABLE "schedule_users_properties" ADD "userIdId" uuid`);
        await queryRunner.query(`ALTER TABLE "schedule_users_properties" ADD CONSTRAINT "FK_e6c6f3e566f21936c1db15225e1" FOREIGN KEY ("propertyIdId") REFERENCES "properties"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schedule_users_properties" ADD CONSTRAINT "FK_634bdf07e6874eefa16aa687fb9" FOREIGN KEY ("userIdId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedule_users_properties" DROP CONSTRAINT "FK_634bdf07e6874eefa16aa687fb9"`);
        await queryRunner.query(`ALTER TABLE "schedule_users_properties" DROP CONSTRAINT "FK_e6c6f3e566f21936c1db15225e1"`);
        await queryRunner.query(`ALTER TABLE "schedule_users_properties" DROP COLUMN "userIdId"`);
        await queryRunner.query(`ALTER TABLE "schedule_users_properties" DROP COLUMN "propertyIdId"`);
    }

}
