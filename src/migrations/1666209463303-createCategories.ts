import { MigrationInterface, QueryRunner } from "typeorm";

export class createCategories1666209463303 implements MigrationInterface {
    name = 'createCategories1666209463303'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "properties" DROP CONSTRAINT "FK_f051b757f8e45139549dceb39af"`);
        await queryRunner.query(`ALTER TABLE "properties" RENAME COLUMN "categoryIdId" TO "categoryId"`);
        await queryRunner.query(`ALTER TABLE "schedule_users_properties" ADD "hour" TIME NOT NULL`);
        await queryRunner.query(`ALTER TABLE "properties" ADD CONSTRAINT "FK_a82b56d3d456c30b8c630cba0c6" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "properties" DROP CONSTRAINT "FK_a82b56d3d456c30b8c630cba0c6"`);
        await queryRunner.query(`ALTER TABLE "schedule_users_properties" DROP COLUMN "hour"`);
        await queryRunner.query(`ALTER TABLE "properties" RENAME COLUMN "categoryId" TO "categoryIdId"`);
        await queryRunner.query(`ALTER TABLE "properties" ADD CONSTRAINT "FK_f051b757f8e45139549dceb39af" FOREIGN KEY ("categoryIdId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
