import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Products{
    
    @PrimaryGeneratedColumn() 
    id: number;

    @Column()
    product_code : string;

    @Column() 
    product_name : string;

    @Column({ nullable  : true }) 
    description : string;

    @Column() 
    unit_of_measure : string;
    
    @Column({ type : "double precision", default : () => 0.00 }) 
    unit_cost : number;

    @Column({ type : "double precision", default : () => 0.00 }) 
    unit_price : number;

    @Column({ type : "double precision", default : () => 0.00 }) 
    unit_srp : number;    

    @Column({ type : 'datetime'})
    last_date_updated : string;

    @Column({ type : 'datetime', default : () => "CURRENT_TIMESTAMP"})
    date_created : string;
}