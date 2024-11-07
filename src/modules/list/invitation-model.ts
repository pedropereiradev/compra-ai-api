import BaseModel from '@src/core/models/base';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import User from '../user/user-model';
import List from './list-model';

export enum InvitationStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

@Entity({ name: 'list_invitations' })
class ListInvitation extends BaseModel {
  @Column()
  telephone: string;

  @Column({ name: 'list_id' })
  listId: number;

  @Column({ name: 'invited_by_id' })
  invitedById: number;

  @Column({ name: 'user_id', nullable: true })
  userId?: number;

  @Column({
    type: 'enum',
    enum: InvitationStatus,
    default: InvitationStatus.PENDING,
  })
  status: InvitationStatus;

  @ManyToOne(() => List)
  @JoinColumn({ name: 'list_id' })
  list: List;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'invited_by_id' })
  invitedBy: User;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user?: User;
}

export default ListInvitation;
