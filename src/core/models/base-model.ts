import {
  BaseEntity,
  BeforeInsert,
  BeforeRemove,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
class BaseModel extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'updated_at' })
  updatedAt?: Date;

  @Column({ nullable: true, name: 'deleted_at' })
  deletedAt?: Date;

  @BeforeInsert()
  setCreatedAt() {
    this.createdAt = new Date();
  }

  @BeforeUpdate()
  setUpdatedAt() {
    this.updatedAt = new Date();
  }

  @BeforeRemove()
  setDeletedAt() {
    this.deletedAt = new Date();
  }
}

export default BaseModel;
