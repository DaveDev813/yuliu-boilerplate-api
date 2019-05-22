import { Entity, Column, PrimaryGeneratedColumn, Generated, Unique } from 'typeorm';

@Entity()
export class Users{
    
    @PrimaryGeneratedColumn() 
    id: number;

    @Generated('uuid')
    @Column({ nullable : false, unique : true })
    app_id : string;

    @Column({ type : "longtext", nullable: false })
    app_origin : string;

    @Column({ nullable : false }) 
    app_name : string;

    @Column({ nullable  : true,  default : () => "''" }) 
    description : string;

    @Generated("uuid")
    @Column({ type : "longtext", unique : true })
    api_key : string;

    @Column({ type : "longtext", nullable : true,  default : () => "''" })
    api_sess_key : string;

    @Column({ type : Boolean, default : () => false, nullable : false })
    is_logged_in : boolean;

    @Column({ type : Boolean, default : () => false, nullable : false })
    is_disabled : boolean;
        
    @Column({ type : 'datetime', default : () => "CURRENT_TIMESTAMP" })
    date_created : string;
}