import { UserListStatus } from '@src/modules/list/user-list-model';
import { type MigrationInterface, type QueryRunner, Table } from 'typeorm';

export class CreateUserListTable1730931748412 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users_lists',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'user_id',
            type: 'int',
          },
          {
            name: 'list_id',
            type: 'int',
          },
          {
            name: 'status',
            type: 'enum',
            enum: Object.values(UserListStatus),
            default: `'${UserListStatus.PENDING}'`,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['list_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'lists',
            onDelete: 'CASCADE',
          },
        ],
        indices: [
          {
            columnNames: ['user_id', 'list_id'],
            isUnique: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users_lists');
  }
}
