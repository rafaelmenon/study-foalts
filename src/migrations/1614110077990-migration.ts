import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1614110077990 implements MigrationInterface {
    name = 'migration1614110077990'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `producttt` (`id` int NOT NULL AUTO_INCREMENT, `text` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `product` CHANGE `id` `id` int NOT NULL");
        await queryRunner.query("ALTER TABLE `product` DROP PRIMARY KEY");
        await queryRunner.query("ALTER TABLE `product` DROP COLUMN `id`");
        await queryRunner.query("ALTER TABLE `product` ADD `id` varchar(36) NOT NULL PRIMARY KEY");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `product` DROP COLUMN `id`");
        await queryRunner.query("ALTER TABLE `product` ADD `id` int NOT NULL AUTO_INCREMENT");
        await queryRunner.query("ALTER TABLE `product` ADD PRIMARY KEY (`id`)");
        await queryRunner.query("ALTER TABLE `product` CHANGE `id` `id` int NOT NULL AUTO_INCREMENT");
        await queryRunner.query("DROP TABLE `producttt`");
    }

}
