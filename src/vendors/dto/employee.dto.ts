import { ApiModelProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  MaxLength,
  Length,
  IsOptional,
  IsArray,
  IsIn,
  ArrayUnique,
  IsMilitaryTime,
  IsPhoneNumber,
  ArrayMaxSize,
  ArrayMinSize,
  ValidateNested,
  IsNumber,
  IsPositive,
  IsBoolean,
} from 'class-validator';

export class NewVendorEmployeeDto {
  @ApiModelProperty()
  @IsNumber()
  vendorId: number;

  @ApiModelProperty()
  @IsNumber()
  branchId: number;

  @ApiModelProperty()
  @IsNumber()
  businessAddressId: string;

  @ApiModelProperty()
  @IsOptional()
  @IsString()
  @Length(10, 100)
  employeeCode: string;

  @ApiModelProperty()
  @IsString()
  @Length(10, 100)
  employeeName: string;

  @ApiModelProperty()
  @IsOptional()
  @IsPhoneNumber('PH')
  mobileNo: string;

  @ApiModelProperty()
  @IsOptional()
  @IsIn(['Therapist', 'Barber', 'Others'])
  position: string;

  @ApiModelProperty()
  @IsNumber()
  commissionToVendor: number;

  @ApiModelProperty()
  @IsOptional()
  @IsNumber()
  overallRating: number;

  @ApiModelProperty()
  @IsOptional()
  @IsBoolean()
  isAvailable: boolean;

  @ApiModelProperty()
  lastUpdated: string;

  @ApiModelProperty()
  lastUpdatedBy: string;

  @ApiModelProperty()
  createdBy: string;

  @ApiModelProperty()
  dateCreated: string;
}

// tslint:disable-next-line:max-classes-per-file
export class UpdateVendorEmployee {
  @ApiModelProperty()
  @IsOptional()
  @IsString()
  @Length(10, 100)
  employeeName: string;

  @ApiModelProperty()
  @IsOptional()
  @IsPhoneNumber('PH')
  mobileNo: string;

  @ApiModelProperty()
  @IsOptional()
  @IsIn(['Therapist', 'Barber', 'Others'])
  position: string;

  @ApiModelProperty()
  @IsOptional()
  @IsNumber()
  commissionToVendor: number;

  @ApiModelProperty()
  @IsOptional()
  @IsNumber()
  overallRating: number;

  @ApiModelProperty()
  @IsOptional()
  @IsBoolean()
  isAvailable: boolean;
}
