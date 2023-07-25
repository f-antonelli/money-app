import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { Category } from './Category';
import { ExpenseType } from '../enums/Expenses';

@Entity()
export class Expense extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  expense_id!: string;

  @Column({ type: 'varchar', width: 50 })
  name!: string;

  @Column({ type: 'enum', enum: ExpenseType, default: ExpenseType.OUTCOME })
  type!: ExpenseType;

  @Column({ type: 'int' })
  amount!: number;

  @Column({ type: 'uuid' })
  userid!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @OneToOne(() => Category, (category) => category.category_id)
  category_id!: number;
}
