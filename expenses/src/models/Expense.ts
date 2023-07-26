import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  ManyToOne,
} from 'typeorm';
import { CategoryType } from '../enums/Categories';
import { Category } from './Category';

@Entity()
export class Expense extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  expense_id!: string;

  @Column({ type: 'varchar', width: 50 })
  name!: string;

  @Column({ type: 'enum', enum: CategoryType, default: CategoryType.Services })
  type!: CategoryType;

  @Column({ type: 'int' })
  amount!: number;

  @Column({ type: 'uuid' })
  user_id!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
