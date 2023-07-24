import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,

} from 'typeorm';

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  category_id!: string;

  @Column({ type: 'varchar', width: 50 })
  name!: string;
}
