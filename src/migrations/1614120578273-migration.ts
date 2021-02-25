import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1614120578273 implements MigrationInterface {
    name = 'migration1614120578273'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `users` (`id` varchar(36) NOT NULL, `name` varchar(20) NOT NULL, `email` varchar(50) NOT NULL, `phone` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `admin` tinyint NOT NULL DEFAULT 0, UNIQUE INDEX `IDX_97672ac88f789774dd47f7c8be` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `product` DROP PRIMARY KEY");
        await queryRunner.query("ALTER TABLE `product` DROP COLUMN `id`");
        await queryRunner.query("ALTER TABLE `product` ADD `id` int NOT NULL PRIMARY KEY AUTO_INCREMENT");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `product` DROP COLUMN `id`");
        await queryRunner.query("ALTER TABLE `product` ADD `id` varchar(36) NOT NULL");
        await queryRunner.query("ALTER TABLE `product` ADD PRIMARY KEY (`id`)");
        await queryRunner.query("DROP INDEX `IDX_97672ac88f789774dd47f7c8be` ON `users`");
        await queryRunner.query("DROP TABLE `users`");
    }

}
