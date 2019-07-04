import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Client_Accounts{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', nullable: false })
    email: string;

    @Column({ type: 'varchar', nullable: false })
    password: string;

    @Column({ type: 'boolean', nullable: false, default: () => false })
    isVerified: boolean;

    @Column({ type: 'text', nullable: false })
    verificationToken: string;

    @Column({ type: 'datetime', nullable : true })
    lastDateUpdated: string;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    dateCreated: string;
}