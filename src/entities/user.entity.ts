import { Entity, Column } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';

@Entity()
export class User {
  /**
   * The user identifier from the Point-of-Sale (POS) system
   */
  @ApiModelProperty()
  @Column({ nullable: false })
  public posId: number;
}
