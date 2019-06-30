import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Vendors {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: true, default: () => '\'N/A\'' })
  mobileNo: string;

  @Column({ type: 'longtext', nullable: false })
  address: string;

  @Column({ type: 'varchar', nullable: false })
  city: string;

  @Column({ type: 'longtext', nullable: true })
  description: string;

  @Column({ type: 'varchar', nullable: true, default: () => '\'N/A\'' })
  telephoneNo: string;

  /** e.g Mon,Tues,Thurs,Fri,Sat */
  @Column({ type: 'varchar', nullable: false })
  daysOpen: string;

  /** e.g Mon,Tues,Thurs,Fri,Sat */
  @Column({ type: 'varchar', nullable: false })
  daysClosed: string;

  @Column({ type: 'time', nullable: false })
  openHours: string;

  @Column({ type: 'time', nullable: false })
  closedHours: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  code: string;

  @Column({ type: 'varchar', nullable: false })
  email: string;

  // ** Spa, Salon, Barber Shop, etc.. */
  @Column({ type: 'varchar', nullable: false, default: () => '\'Others\'' })
  businessType: string;

  // ** Active, Disabled */
  @Column({ type: 'varchar', default: () => '\'Active\'' })
  vendorStatus: string;

  // ** Free, Standard, Premium */
  @Column({ type: 'varchar', nullable: true, default: () => '\'Free\'' })
  accountType: string;

  @Column({ type: 'datetime', nullable: true })
  lastTransactionDate: string;

  @Column({ type: 'integer', nullable: true })
  updatedBy: string;

  @Column({ type: 'datetime', nullable: true })
  lastDateUpdated: string;

  @Column({ type: 'integer', nullable: false })
  createdBy: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  dateCreated: string;
}

// tslint:disable-next-line:max-classes-per-file
@Entity()
export class VendorBranches {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer', nullable: false })
  vendorId: number;

  @Column({ type: 'varchar', nullable: false, unique: true })
  branchCode: string;

  @Column({ type: 'varchar', nullable: false })
  contactPerson: string;

  @Column({ type: 'varchar', nullable: false })
  mobileNo: string;

  @Column({ type: 'varchar', nullable: true, default: () => '\'N/A\'' })
  telephoneNo: string;

  @Column({ type: 'varchar', nullable: false })
  daysOpen: string;

  @Column({ type: 'varchar', nullable: false })
  daysClosed: string;

  @Column({ type: 'time', nullable: false })
  openHours: string;

  @Column({ type: 'time', nullable: false })
  closedHours: string;

  @Column({ type: 'longtext', nullable: false })
  address: string;

  @Column({ type: 'varchar', nullable: false })
  city: string;

  // ** Active, Disabled */
  @Column({ type: 'varchar', default: () => '\'Disabled\'' })
  branchStatus: string;

  @Column({ type: 'datetime', nullable: true })
  lastTransactionDate: string;

  @Column({ type: 'integer', nullable: true })
  updatedBy: string;

  @Column({ type: 'datetime', nullable: true })
  lastDateUpdated: string;

  @Column({ type: 'integer', nullable: false })
  createdBy: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  dateCreated: string;
}

// tslint:disable-next-line:max-classes-per-file
@Entity()
export class VendorProducts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer', nullable: false })
  vendorId: number;

  @Column({ type: 'integer', nullable: false })
  branchId: number;

  @Column({ type: 'varchar', nullable: false, unique: true })
  productCode: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'longtext', nullable: true })
  description: string;

  @Column({ type: 'varchar', nullable: true, default: () => '\'Service\'' })
  productType: string;

  @Column({ type: 'varchar', nullable: true, default: () => '\'N/A\'' })
  duration: string;

  @Column({ type: 'double precision', nullable: false, default: () => 0.0 })
  productCost: number;

  @Column({ type: 'double precision', nullable: false, default: () => 0.0 })
  productPrice: number;

  @Column({ type: 'double precision', nullable: false, default: () => 0.0 })
  productComission: number;

  @Column({ type: 'double precision', nullable: true, default: () => 0.0 })
  rating: number;

  @Column({ type: 'integer', nullable: true })
  updatedBy: number;

  @Column({ type: 'datetime', nullable: true })
  lastDateUpdated: string;

  @Column({ type: 'integer', nullable: false })
  createdBy: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  dateCreated: string;
}

// tslint:disable-next-line:max-classes-per-file
@Entity()
export class VendorEmployees {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer', nullable: false })
  vendorId: number;

  /** Vendor_business_address */
  @Column({ type: 'integer', nullable: false })
  branchId: number;

  @Column({ type: 'varchar', nullable: false, unique: true })
  employeeCode: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  employeeName: string;

  @Column({ type: 'varchar', nullable: true, default: () => '\'N/A\'' })
  mobileNo: string;

  @Column({ type: 'varchar', nullable: true, default: () => '\'Others\'' })
  position: string;

  @Column({ type: 'double precision', nullable: true, default: () => 0.0 })
  commissionToVendor: number;

  @Column({ type: 'double precision', nullable: true, default: () => 0.0 })
  overallRating: number;

  @Column({ type: 'boolean', default: () => false })
  isAvailable: string;

  @Column({ type: 'datetime', nullable: true })
  lastUpdated: string;

  @Column({ type: 'varchar', nullable: true })
  lastUpdatedBy: string;

  @Column({ type: 'varchar', nullable: false })
  createdBy: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  dateCreated: string;
}

@Entity()
export class VendorUsers {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer', nullable: false })
  vendor_id: number;

  @Column({ type: 'integer', nullable: false })
  business_address_id: number;

  @Column({ type: 'varchar', nullable: false, unique: true })
  username: string;

  @Column({ type: 'varchar', nullable: false })
  first_name: string;

  @Column({ type: 'varchar', nullable: true })
  middle_name: string;

  @Column({ type: 'varchar', nullable: false })
  last_name: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ type: 'varchar', nullable: false, default: () => '\'User\'' })
  access_level: string;

  @Column({ type: 'integer', nullable: true })
  updated_by: number;

  @Column({ type: 'datetime', nullable: true })
  last_date_updated: string;

  @Column({ type: 'integer', nullable: false })
  created_by: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  date_created: string;
}
