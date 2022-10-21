import { MigrationInterface, QueryRunner } from "typeorm";

export class fixNames1666323568117 implements MigrationInterface {
    name = 'fixNames1666323568117'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedule_users_properties" DROP CONSTRAINT "FK_e6c6f3e566f21936c1db15225e1"`);
        await queryRunner.query(`ALTER TABLE "schedule_users_properties" DROP CONSTRAINT "FK_634bdf07e6874eefa16aa687fb9"`);
        await queryRunner.query(`ALTER TABLE "schedule_users_properties" DROP COLUMN "propertyIdId"`);
        await queryRunner.query(`ALTER TABLE "schedule_users_properties" DROP COLUMN "userIdId"`);
        await queryRunner.query(`ALTER TABLE "schedule_users_properties" ADD "propertyId" uuid`);
        await queryRunner.query(`ALTER TABLE "schedule_users_properties" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "schedule_users_properties" ADD CONSTRAINT "FK_d8e3114988fcedd2076b1edf0f2" FOREIGN KEY ("propertyId") REFERENCES "properties"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schedule_users_properties" ADD CONSTRAINT "FK_70998988b2213e2a0570b245c29" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedule_users_properties" DROP CONSTRAINT "FK_70998988b2213e2a0570b245c29"`);
        await queryRunner.query(`ALTER TABLE "schedule_users_properties" DROP CONSTRAINT "FK_d8e3114988fcedd2076b1edf0f2"`);
        await queryRunner.query(`ALTER TABLE "schedule_users_properties" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "schedule_users_properties" DROP COLUMN "propertyId"`);
        await queryRunner.query(`ALTER TABLE "schedule_users_properties" ADD "userIdId" uuid`);
        await queryRunner.query(`ALTER TABLE "schedule_users_properties" ADD "propertyIdId" uuid`);
        await queryRunner.query(`ALTER TABLE "schedule_users_properties" ADD CONSTRAINT "FK_634bdf07e6874eefa16aa687fb9" FOREIGN KEY ("userIdId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schedule_users_properties" ADD CONSTRAINT "FK_e6c6f3e566f21936c1db15225e1" FOREIGN KEY ("propertyIdId") REFERENCES "properties"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
