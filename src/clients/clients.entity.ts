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
    contact_no : string;

    @Column({ 
        type : 'boolean', 
        default : () => "FALSE"
    }) 
    is_disabled : boolean;
    
    @Column({
        type : 'datetime',
        default : () => "CURRENT_TIMESTAMP"
    })
    date_created : string;
}