import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Clients{
    
    @PrimaryGeneratedColumn() 
    id: number;

    @Column({ type : "text", nullable  : false }) 
    firstname : string;

    @Column({ type : "text", nullable  : true }) 
    middlename : string;

    @Column({ type : "text", nullable  : false }) 
    lastname : string;
    
    @Column({ type : "varchar", nullable : false, unique : false })
    email : string;
    
    @Column({ type : "varchar", nullable: false})
    mobile_no : string;

    @Column({ type : "varchar", nullable : true })
    telephone_no : string;

    @Column({ type : "longtext", nullable : false})
    address : string;

    @Column({ type : "text", nullable : false })
    zip_code : string;

    @Column({ type : "text", nullable : false })
    city : string;

    @Column({type : 'datetime', nullable : true})
    last_transaction_date : string;

    @Column({ type : 'datetime'})
    last_date_updated : string;

    @Column({type : 'datetime', default : () => "CURRENT_TIMESTAMP"})
    date_created : string;
}