import {
  IsNotEmpty,
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  IsIn,
} from 'class-validator';
import { Optional } from '@nestjs/common';
import { ApiModelProperty } from '@nestjs/swagger';

export class NewClientDto {
  @ApiModelProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  firstname: string;

  @ApiModelProperty()
  @Optional()
  @MaxLength(20)
  middlename: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  lastname: string;

  @ApiModelProperty()
  @IsEmail()
  @IsString()
  email: string;

  @ApiModelProperty()
  @IsNotEmpty()
  birthday: string;

  @ApiModelProperty()
  @IsIn(['Male', 'Female'])
  gender: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsString()
  @Optional()
  telephoneNo?: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsString()
  mobileNo: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsString()
  zipCode: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsString()
  city: string;
}

// tslint:disable-next-line:max-classes-per-file
export class UpdateClientDto {
  @ApiModelProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  firstname: string;

  @ApiModelProperty()
  @Optional()
  @MaxLength(20)
  middlename?: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  lastname: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsString()
  mobileNo: string;

  @ApiModelProperty()
  @IsNotEmpty()
  birthday: string;

  @ApiModelProperty()
  @IsIn(['Male', 'Female'])
  gender: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsString()
  zipCode: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsString()
  city: string;
}
