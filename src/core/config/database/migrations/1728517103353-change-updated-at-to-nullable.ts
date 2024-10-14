import {
  type MigrationInterface,
  type QueryRunner,
  TableColumn,
} from 'typeorm';

export class ChangeUpdatedAtToNullable1728517103353
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'lists',
      'updated_at',
      new TableColumn({
        name: 'updated_at',
        type: 'timestamp',
        isNullable: true,
      }),
    );

    await queryRunner.changeColumn(
      'items',
      'updated_at',
      new TableColumn({
        name: 'updated_at',
        type: 'timestamp',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'lists',
      'updated_at',
      new TableColumn({
        name: 'updated_at',
        type: 'timestamp',
        isNullable: false,
      }),
    );

    await queryRunner.changeColumn(
      'items',
      'updated_at',
      new TableColumn({
        name: 'updated_at',
        type: 'timestamp',
        isNullable: false,
      }),
    );
  }
}
