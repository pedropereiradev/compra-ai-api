import type { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveStatusFromUserListTable1730934930191
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users_lists" DROP COLUMN "status"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users_lists" ADD "status" character varying NOT NULL`,
    );
  }
}
