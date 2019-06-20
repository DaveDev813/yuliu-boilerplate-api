import { Entity, Column, PrimaryGeneratedColumn, Generated } from 'typeorm';

@Entity()
export class VendorUsers {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false, unique: true })
  vendorId: string;

  @Column({ type: 'varchar', nullable: false })
  sessionId: string;

  @Column({ type: 'text', nullable: false })
  employeeId: string;

  @Column({ type: 'text', nullable: false })
  firstname: string;

  @Column({ type: 'text', nullable: true })
  middlename: string;

  @Column({ type: 'text', nullable: false })
  lastname: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  mobileNo: string;

  @Column({
    type: 'boolean',
    default: () => false,
  })
  isIoggedId: string;

  @Column({ type: 'datetime', nullable: true })
  sessionExpiration: string;

  @Column({ type: 'datetime' })
  lastDateUpdated: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  dateCreated: string;
}
