import { ApiModelProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
  IsPhoneNumber,
  IsDateString,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class NewClientAddressDto {
  @ApiModelProperty()
  @IsNumber()
  clientId: number;

  @ApiModelProperty()
  @IsString()
  fullName: string;

  @ApiModelProperty()
  @IsString()
  @IsPhoneNumber('PH')
  mobileNo: string;

  @ApiModelProperty()
  @IsString()
  address: string;

  @ApiModelProperty()
  @IsString()
  barangay: string;

  @ApiModelProperty()
  @IsString()
  city: string;

  @ApiModelProperty()
  @IsString()
  province: string;

  @ApiModelProperty()
  @IsDateString()
  lastTransactionDate: string;

  @ApiModelProperty()
  @IsDateString()
  lastDateUpdated: string;

  @ApiModelProperty()
  @IsDateString()
  dateCreated: string;
}

// tslint:disable-next-line:max-classes-per-file
export class UpdateAddressDto {
  @ApiModelProperty()
  @IsNumber()
  clientId: number;

  @ApiModelProperty()
  @IsString()
  fullName: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber('PH')
  mobileNo: string;

  @ApiModelProperty()
  @IsString()
  address: string;

  @ApiModelProperty()
  @IsString()
  barangay: string;

  @ApiModelProperty()
  @IsString()
  city: string;

  @ApiModelProperty()
  @IsString()
  province: string;
}
