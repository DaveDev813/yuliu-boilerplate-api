import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Client_Reviews {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  clientId: string;

  /** Vendor id, transaction id, product id  */
  @Column({ type: 'text', nullable: false })
  referenceId: string;

  /** Service, Business, Product */
  @Column({ type: 'text', nullable: false })
  feedbackTo: string;

  @Column({ type: 'varchar', nullable: false })
  rating: string;

  @Column({ type: 'text', nullable: false })
  feedback: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  dateCreated: string;
}
