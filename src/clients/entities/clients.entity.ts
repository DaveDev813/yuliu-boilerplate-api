import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Clients_Information{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type:'int', nullable : false })
  account_id : number;

  @Column({ type: 'text', nullable: false })
  firstname: string;

  @Column({ type: 'text', nullable: true })
  middlename: string;

  @Column({ type: 'text', nullable: false })
  lastname: string;

  @Column({ type: 'date', nullable: true })
  birthday: string;

  @Column({ type: 'text', nullable: true })
  gender: string;

  @Column({ type: 'varchar', nullable: false, unique: false })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  mobileNo: string;

  @Column({ type: 'datetime', nullable: true })
  lastTransactionDate: string;

  @Column({ type: 'datetime' })
  lastDateUpdated: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  dateCreated: string;
}