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