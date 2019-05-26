import { Entity, Column, PrimaryGeneratedColumn, Generated } from 'typeorm';

@Entity()
export class Users{

    @PrimaryGeneratedColumn() 
    id: number;

    /**
     * Name of the app 
     */
    @Column({ nullable : false }) 
    app_name : string;

    /**
     * Additional information stating what is the app for. 
     */
    @Column({ type : "longtext", nullable  : true}) 
    description : string;

    /**
     * This is the EXPECTED origin of the app 
     * this will be collated and used in a CORS policy.
     */
    @Column({ type : "longtext", nullable: false })
    app_origin : string;

    /**
     * Unique key for descrypting/encrypting payloads
     * between transaction (JWT)
     */
    @Generated("uuid")
    @Column({ type : "longtext", unique : true })
    app_token : string;

    /**
     * A unique key for an app,
     * this will be used as a token that proves
     * that an app has an access to the API,
     * 
     * Note. 
     * Unique key privileges are to follow.
     * (Adding access level to API keys to grant extensive security.)
     */
    @Generated("uuid")
    @Column({ type : "longtext", unique : true })
    api_key : string;

    /**
     * App token validity,
     * Holds the validity date of the app_token,
     * if expired, payload SHOULD NOT BE PROCESSED,
     */
    @Column({ type : 'datetime'})
    app_token_validity : string;

    /**
     * API Key validity,
     * Holds the validity date of the API Key,
     * if expired, THE API ITSELF WILL NOT BE ACCESSBILE ANYMORE TO THE APP
     */
    @Column({ type : 'datetime'})
    api_key_validity : string;

    /**
     * Flag that tells that this app is whether enabled or disabled
     */
    @Column({ type : Boolean, nullable : false, default : () => false })
    is_disabled : boolean;

    /**
     * The last transaction date the app has made
     */
    @Column({ type : 'datetime', nullable : false })
    last_transaction_date : string;

    @Column({ type : 'datetime', default : () => "CURRENT_TIMESTAMP" })
    date_created : string;
}