import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { Password } from '../utils/password';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  user_id!: string;

  @Column({ type: 'text', width: 15 })
  username!: string;

  @Column({ type: 'text'})
  password!: string;

  @Column({ unique: true, type: 'text' })
  email!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @BeforeInsert()
  async checkFieldsBeforeInsert() {
    this.email = this.email.toLocaleLowerCase().trim();

    this.password = await Password.toHash(this.password);
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.checkFieldsBeforeInsert();
  }
}
