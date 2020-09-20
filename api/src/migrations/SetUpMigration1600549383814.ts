import {MigrationInterface, QueryRunner} from "typeorm";

export class SetupMigration1600549383814 implements MigrationInterface {

     public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query('INSERT INTO `serving`(`id`, `name`, `price`, `description`, `category`, `createdAt`, `updatedAt`) VALUES (DEFAULT, "Avo on toast", 8.5, "", "food", DEFAULT, DEFAULT);');
        queryRunner.query('INSERT INTO `serving`(`id`, `name`, `price`, `description`, `category`, `createdAt`, `updatedAt`) VALUES (DEFAULT, "Pesto pasta with pine nuts and mozzarella",9.5,"","food", DEFAULT, DEFAULT);');
        queryRunner.query('INSERT INTO `serving`(`id`, `name`, `price`, `description`, `category`, `createdAt`, `updatedAt`) VALUES (DEFAULT, "Roasted pork belly with kimchi and soy sauce glaze",11,"","food", DEFAULT, DEFAULT);');
        queryRunner.query('INSERT INTO `serving`(`id`, `name`, `price`, `description`, `category`, `createdAt`, `updatedAt`) VALUES (DEFAULT, "Mac and cheese with crunchy seitan ‘bacon’ (V)",10,"","food", DEFAULT, DEFAULT);');
        queryRunner.query('INSERT INTO `serving`(`id`, `name`, `price`, `description`, `category`, `createdAt`, `updatedAt`) VALUES (DEFAULT, "Gin and Tonic",9.05,"","drink", DEFAULT, DEFAULT);');
        queryRunner.query('INSERT INTO `serving`(`id`, `name`, `price`, `description`, `category`, `createdAt`, `updatedAt`) VALUES (DEFAULT, "White Russian",9.20,"","drink", DEFAULT, DEFAULT);');
        queryRunner.query('INSERT INTO `serving`(`id`, `name`, `price`, `description`, `category`, `createdAt`, `updatedAt`) VALUES (DEFAULT, "Mojito",8,"","drink", DEFAULT, DEFAULT);');
        queryRunner.query('INSERT INTO `serving`(`id`, `name`, `price`, `description`, `category`, `createdAt`, `updatedAt`) VALUES (DEFAULT, "Old Fashioned",9,"","drink", DEFAULT, DEFAULT);');
        queryRunner.query('INSERT INTO `serving`(`id`, `name`, `price`, `description`, `category`, `createdAt`, `updatedAt`) VALUES (DEFAULT, "Chocolate Brownie with Vanilla Icecream",7.2,"","dessert", DEFAULT, DEFAULT);');
        queryRunner.query('INSERT INTO `serving`(`id`, `name`, `price`, `description`, `category`, `createdAt`, `updatedAt`) VALUES (DEFAULT, "Maple Syrup Waffles",7.5,"","dessert", DEFAULT, DEFAULT);');
        queryRunner.query('INSERT INTO `serving`(`id`, `name`, `price`, `description`, `category`, `createdAt`, `updatedAt`) VALUES (DEFAULT, "A really tasty apple",7.5,"","dessert", DEFAULT, DEFAULT);');
    }

    async down(_: QueryRunner): Promise<void> {

    }


}
