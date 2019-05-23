import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Clients{
    
    @PrimaryGeneratedColumn() 
    id: number;

    @Column() 
    firstname : string;

    @Column({ nullable  : true }) 
    middlename : string;

    @Column() 
    lastname : string;
    
    @Column() 
    email : string;
    
    @Column()
    mobile_no : string;

    @Column({ nullable : true })
    telephone_no : string;

    @Column({ type : "longtext"})
    address : string;

    @Column()
    zip_code : string;

    @Column()
    city : string;

    @Column({type : 'datetime', nullable : true})
    last_transaction_date : string;

    @Column({type : 'datetime', default : () => "CURRENT_TIMESTAMP"})
    date_created : string;
}