import { Entity, Column, PrimaryGeneratedColumn, Generated } from 'typeorm';

@Entity()
export class VendorUsers{
    
    @PrimaryGeneratedColumn() 
    id: number;

    @Column({ type : "varchar", nullable  : false, unique : true }) 
    vendor_id : string;

    @Column({ type : 'varchar', nullable : false })
    session_id : string;

    @Column({ type : "text", nullable  : false }) 
    employee_id : string;

    @Column({ type : "text", nullable  : false }) 
    firstname : string;

    @Column({ type : "text", nullable  : true, }) 
    middlename : string;

    @Column({ type : "text", nullable : false })
    lastname : string;
    
    @Column({ type : "varchar", nullable : false, unique : true})
    email : string;

    @Column({ type : "varchar", nullable: true })
    mobile_no : string;

    @Column({ type : 'boolean', default : () => { false } })
    is_logged_id : string;

    @Column({ type : 'datetime', nullable : true })
    session_expiration : string;

    @Column({ type : 'datetime' })
    last_date_updated : string;

    @Column({type : 'datetime', default : () => "CURRENT_TIMESTAMP" })
    date_created : string;
}