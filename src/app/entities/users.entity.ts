import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class Users extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'varchar', nullable: false, length: 20 })
  name: string;

  @Column({ type: 'varchar', unique: true, nullable: false, length: 50 })
  email: string;

  @Column({ type: 'varchar' })
  phone: string;

  @Column({ type: 'varchar', nullable: false })
  password: string

  @Column({ type: 'boolean', default: false })
  admin: boolean
}
