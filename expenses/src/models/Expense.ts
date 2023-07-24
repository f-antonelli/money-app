import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Category } from './Category';

enum ExpenseType {
  INCOME = 'INCOME',
  OUTCOME = 'OUTCOME',
}

@Entity()
export class Expense extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  expense_id!: string;

  @Column({ type: 'varchar', width: 50 })
  name!: string;

  @Column({ type: 'enum', enum: ExpenseType, default: ExpenseType.OUTCOME })
  type!: ExpenseType;

  @Column({ type: 'int' })
  amount!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @ManyToOne(() => Category, (category) => category.category_id)
  category_id!: number;
}
