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

@Entity()
export class Expense extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  expense_id!: string;

  @Column({ type: 'uuid' })
  user_id!: string;

  @Column({ type: 'varchar', width: 50 })
  name!: string;

  @Column({ type: 'int' })
  amount!: number;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @ManyToOne(() => Category)
  type!: Category;
}
