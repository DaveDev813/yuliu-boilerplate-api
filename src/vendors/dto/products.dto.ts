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
  IsPositive,
} from 'class-validator';

export class NewVendorProduct {
  @ApiModelProperty()
  @IsNumber()
  branchId: number;

  @ApiModelProperty()
  @IsString()
  @Length(5, 100)
  name: string;

  @ApiModelProperty()
  @IsOptional()
  @IsString()
  @Length(50, 1000)
  description: string;

  @ApiModelProperty()
  @IsIn(['Service', 'Item', 'Royalty'])
  @IsString()
  productType: string;

  @ApiModelProperty()
  @IsOptional()
  @IsString()
  @IsMilitaryTime()
  duration: string;

  @ApiModelProperty()
  @IsPositive()
  @IsNumber()
  productCost: number;

  @ApiModelProperty()
  @IsPositive()
  @IsNumber()
  productPrice: number;

  @ApiModelProperty()
  @IsPositive()
  @IsNumber()
  productComission: number;
}

// tslint:disable-next-line:max-classes-per-file
export class UpdateVendorProductDto {
  @ApiModelProperty()
  @IsOptional()
  @IsString()
  @Length(5, 100)
  name: string;

  @ApiModelProperty()
  @IsOptional()
  @IsString()
  @Length(50, 1000)
  description: string;

  @ApiModelProperty()
  @IsOptional()
  @IsIn(['Service', 'Item', 'Royalty'])
  @IsString()
  productType: string;

  @ApiModelProperty()
  @IsOptional()
  @IsString()
  @IsMilitaryTime()
  duration: string;

  @ApiModelProperty()
  @IsOptional()
  @IsPositive()
  @IsNumber()
  productCost: number;

  @ApiModelProperty()
  @IsOptional()
  @IsPositive()
  @IsNumber()
  productPrice: number;

  @ApiModelProperty()
  @IsOptional()
  @IsPositive()
  @IsNumber()
  productComission: number;

  @ApiModelProperty()
  updatedBy: string;
}
