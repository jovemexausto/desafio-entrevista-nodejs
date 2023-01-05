import { MigrationInterface, QueryRunner } from 'typeorm';

export class VehicleTable1672919964740 implements MigrationInterface {
  name = 'VehicleTable1672919964740';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`vehicle\` (\`id\` int NOT NULL AUTO_INCREMENT, \`make\` varchar(255) NOT NULL, \`model\` varchar(255) NOT NULL, \`plate\` varchar(255) NOT NULL, \`color\` varchar(255) NOT NULL, \`year\` int NOT NULL, \`type\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_51922d0c6647cb10de3f76ba4e\` (\`plate\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "vehicle"`);
  }
}
