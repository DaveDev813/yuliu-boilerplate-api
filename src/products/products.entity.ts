import { Entity, Column, PrimaryGeneratedColumn, TableForeignKey, JoinColumn, ManyToMany, ManyToOne } from 'typeorm';

@Entity()
export class Products{
    
    @PrimaryGeneratedColumn() 
    id: number;

    // @ManyToOne(type : Vendors)
    // @JoinColumn()
    @Column({ type : "int", nullable : false})
    vendor_id : string;

    @Column({ type : "varchar", nullable : false, unique : true}) 
    product_code : string;

    @Column({ type : "varchar", nullable : false, unique : true}) 
    product_name : string;

    @Column({ type : "longtext", nullable : true }) 
    description : string;

    @Column({ type : "text", nullable : false }) 
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