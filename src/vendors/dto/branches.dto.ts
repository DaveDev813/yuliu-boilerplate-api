import { ApiModelProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsPhoneNumber,
  IsOptional,
  Length,
  IsArray,
  ArrayUnique,
  ArrayMinSize,
  ArrayMaxSize,
  ValidateNested,
  IsIn,
  IsMilitaryTime,
} from 'class-validator';

export class NewVendorBranchDto {
  @ApiModelProperty()
  @IsNumber()
  vendorId: number;

  @ApiModelProperty()
  branchCode: string;

  @ApiModelProperty()
  @IsString()
  @Length(3, 30)
  contactPerson: string;

  @ApiModelProperty()
  @IsString()
  @Length(11, 11)
  @IsPhoneNumber(`PH`)
  mobileNo: string;

  @ApiModelProperty()
  @IsOptional()
  @IsString()
  @IsPhoneNumber(`PH`)
  // @Length(7, 7)
  telephoneNo: string;

  @ApiModelProperty()
  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @ArrayMinSize(1)
  @ArrayMaxSize(7)
  @ValidateNested()
  @IsIn(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], { each: true })
  daysOpen: string[];

  @ApiModelProperty()
  @IsOptional()
  @IsMilitaryTime()
  @IsString()
  openHours: string;

  @ApiModelProperty()
  closedHours: string;

  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiModelProperty()
  @IsIn(['Enabled', 'Disabled'])
  branchStatus: string;
}

// tslint:disable-next-line:max-classes-per-file
export class UpdateVendorBranchDto {
  @ApiModelProperty()
  @IsNumber()
  vendorId: number;

  @ApiModelProperty()
  branchCode: string;

  @ApiModelProperty()
  @IsString()
  @Length(3, 30)
  contactPerson: string;

  @ApiModelProperty()
  @IsString()
  @Length(11, 11)
  @IsPhoneNumber(`PH`)
  mobileNo: string;

  @ApiModelProperty()
  @IsOptional()
  @IsString()
  // @IsPhoneNumber(`PH`)
  // @Length(7, 7)
  telephoneNo: string;

  @ApiModelProperty()
  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @ArrayMinSize(1)
  @ArrayMaxSize(7)
  @ValidateNested()
  @IsIn(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], { each: true })
  daysOpen: string[];

  @ApiModelProperty()
  @IsOptional()
  @IsMilitaryTime()
  @IsString()
  openHours: string;

  @ApiModelProperty()
  closedHours: string;

  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiModelProperty()
  @IsIn(['Enabled', 'Disabled'])
  branchStatus: string;
}
