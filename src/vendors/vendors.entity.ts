import { Entity, Column, PrimaryGeneratedColumn, Generated } from 'typeorm';

@Entity()
export class Vendors{
    
    @PrimaryGeneratedColumn() 
    id: number;

    @Generated('uuid')
    @Column({ type : "varchar", nullable  : false, unique : true }) 
    code : string;

    @Column({ type : "text", nullable  : false }) 
    name : string;

    @Column({ type : "text", nullable  : false }) 
    description : string;

    @Column({ type : "varchar", nullable : false })
    email : string;
    
    @Column({ type : "varchar", nullable: true })
    mobile_no : string;

    @Column({ type : "varchar", nullable : true })
    telephone_no : string;

    @Column({type : 'text', nullable : true })
    business_hours : string;

    @Column({ type : "longtext", nullable : false })
    address : string;

    @Column({ type : "varchar", nullable: false })
    city : string;

    @Column({ type : "varchar", nullable: true })
    province : string;

    @Column({type : 'text', nullable : false })
    business_type : string;

    @Column({ type : "varchar", default : () => "'Active'"})
    vendor_status : string;

    @Column({type : 'text', nullable : false })
    vendor_type : string;

    @Column({type : 'datetime', nullable : true })
    last_transaction_date : string;

    @Column({ type : 'datetime' })
    last_date_updated : string;

    @Column({type : 'datetime', default : () => "CURRENT_TIMESTAMP" })
    date_created : string;
}

@Entity()
export class Vendor_Business_Address{
    
    @PrimaryGeneratedColumn() 
    id: number;

    @Column({ type : "text", nullable  : false }) 
    branch_code : string;

    @Column({ type : "text", nullable  : false }) 
    contact_person : string;

    @Column({ type : "varchar", nullable: true })
    mobile_no : string;

    @Column({ type : "varchar", nullable : true })
    telephone_no : string;

    @Column({type : 'text', nullable : true })
    business_hours : string;

    @Column({ type : "longtext", nullable : false })
    address : string;

    @Column({ type : "varchar", nullable: false })
    city : string;

    @Column({ type : "varchar", nullable: true })
    province : string;

    @Column({type : 'datetime', nullable : true })
    last_transaction_date : string;

    @Column({ type : 'datetime' })
    last_date_updated : string;

    @Column({type : 'datetime', default : () => "CURRENT_TIMESTAMP" })
    date_created : string;
}

@Entity()
export class Vendor_Employee{

    @PrimaryGeneratedColumn() 
    id: number;

    @Column({ type : "text", nullable  : true }) 
    employee_id : string;

    @Column({ type : "text", nullable  : true }) 
    vendor_id : string;

    /** Vendor_business_address */
    @Column({ type : "text", nullable  : true }) 
    branch_code : string;

    @Column({ type : "text", nullable  : true }) 
    firstname : string;

    @Column({ type : "text", nullable  : true }) 
    middlename : string;

    @Column({ type : "text", nullable  : true }) 
    lastname : string;

    @Column({ type : "text", nullable  : true }) 
    position : string;

    @Column({type : 'datetime', nullable : true })
    last_transaction_date : string;
    
    @Column({ type : 'datetime' })
    last_date_updated : string;

    @Column({type : 'datetime', default : () => "CURRENT_TIMESTAMP" })
    date_created : string;
}

@Entity()
export class Vendor_Services{

    @PrimaryGeneratedColumn() 
    id: number;

    @Column({ type : 'datetime' })
    last_date_updated : string;

    @Column({type : 'datetime', default : () => "CURRENT_TIMESTAMP" })
    date_created : string;
}