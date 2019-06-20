import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Clients {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  firstname: string;

  @Column({ type: 'text', nullable: true })
  middlename: string;

  @Column({ type: 'text', nullable: false })
  lastname: string;

  @Column({ type: 'date', nullable: true })
  birthday: string;

  @Column({ type: 'text', nullable: false })
  gender: string;

  @Column({ type: 'varchar', nullable: false, unique: false })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  mobile_no: string;

  @Column({ type: 'boolean', nullable: false, default: () => false })
  is_verified: string;

  @Column({ type: 'text', nullable: false })
  verification_token: string;

  @Column({ type: 'datetime', nullable: true })
  last_transaction_date: string;

  @Column({ type: 'datetime' })
  last_date_updated: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  date_created: string;
}

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

@Entity()
export class Client_Reviews {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  client_id: string;

  /** Vendor id, transaction id, product id  */
  @Column({ type: 'text', nullable: false })
  reference_id: string;

  /** Service, Business, Product */
  @Column({ type: 'text', nullable: false })
  feedback_to: string;

  @Column({ type: 'varchar', nullable: false })
  rating: string;

  @Column({ type: 'text', nullable: false })
  feedback: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  date_created: string;
}
