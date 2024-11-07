import { InvitationStatus } from '@src/modules/list/invitation-model';
import { type MigrationInterface, type QueryRunner, Table } from 'typeorm';

export class CreateInvitationTable1730934845312 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'list_invitations',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'telephone',
            type: 'varchar',
          },
          {
            name: 'list_id',
            type: 'int',
          },
          {
            name: 'invited_by_id',
            type: 'int',
          },
          {
            name: 'user_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'status',
            type: 'enum',
            enum: Object.values(InvitationStatus),
            default: `'${InvitationStatus.PENDING}'`,
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
            columnNames: ['list_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'lists',
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['invited_by_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('list_invitations');
  }
}
