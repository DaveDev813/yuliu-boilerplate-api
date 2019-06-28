import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Client_Address_Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  clientId: string;

  @Column({ type: 'text', nullable: true })
  fullName: string;

  @Column({ type: 'text', nullable: false })
  mobileNo: string;

  /** House/Unit/Flr #, Bldg Name, Blk or Lot # */
  @Column({ type: 'varchar', nullable: false, unique: false })
  address: string;

  @Column({ type: 'varchar', nullable: false })
  barangay: string;

  @Column({ type: 'varchar', nullable: false })
  city: string;

  @Column({ type: 'varchar', nullable: false })
  province: string;

  @Column({ type: 'datetime', nullable: true })
  lastTransactionDate: string;

  @Column({ type: 'datetime' })
  lastDateUpdated: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  dateCreated: string;
}