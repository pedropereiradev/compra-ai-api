import {
  type MigrationInterface,
  type QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class CreateOwnerList1730161158067 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'lists',
      new TableColumn({
        name: 'owner_id',
        type: 'integer',
      }),
    );

    await queryRunner.createForeignKey(
      'lists',
      new TableForeignKey({
        columnNames: ['owner_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('lists');
    const foreignKey = table?.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('owner_id') !== -1,
    );

    if (foreignKey) {
      await queryRunner.dropForeignKey('lists', foreignKey);
    }

    await queryRunner.dropColumn('lists', 'owner_id');
  }
}
