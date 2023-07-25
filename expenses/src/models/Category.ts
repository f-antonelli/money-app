import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
} from 'typeorm';

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  category_id!: number;

  @Column({ type: 'varchar', width: 50 })
  name!: string;

  @Column({ type: 'varchar', width: 100 })
  description!: string;
}
