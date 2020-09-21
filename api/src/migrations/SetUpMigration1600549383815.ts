import {MigrationInterface, QueryRunner} from "typeorm";

export class SetupMigration1600549383815 implements MigrationInterface {

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
        queryRunner.query('INSERT INTO `serving`(`id`, `name`, `price`, `description`, `category`, `createdAt`, `updatedAt`) VALUES (DEFAULT, "A really tasty apple",6.8,"","dessert", DEFAULT, DEFAULT);');
        queryRunner.query('INSERT INTO `offer`(`id`, `name`, `type`, `value`, `requiredMeals`, `requiredDrinks`, `requiredDesserts`) VALUES (DEFAULT, "Hungry Date Offer! Get 2 mains + 2 drinks + 1 dessert for 40.00", "fixed price",40,2,2,1);');
        queryRunner.query('INSERT INTO `offer`(`id`, `name`, `type`, `value`, `requiredMeals`, `requiredDrinks`, `requiredDesserts`) VALUES (DEFAULT, "Hot offer! Get 10% off each main and drink combo.", "discount",10,1,1,0);');
    }

    async down(_: QueryRunner): Promise<void> {

    }


}
