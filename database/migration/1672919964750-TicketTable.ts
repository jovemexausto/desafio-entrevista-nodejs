import { MigrationInterface, QueryRunner } from 'typeorm';

export class TicketTable1672919964750 implements MigrationInterface {
  name = 'TicketTable1672919964750';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`ticket\` (\`id\` int NOT NULL AUTO_INCREMENT, \`status\` varchar(255) NOT NULL DEFAULT 'entered', \`vehicleType\` varchar(255) NOT NULL, \`enteredAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`exitedAt\` datetime NULL, \`vehicleId\` int NOT NULL, \`parkingId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "ticket"`);
  }
}
