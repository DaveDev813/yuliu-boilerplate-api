import { ApiModelProperty } from "@nestjs/swagger";
import { IsNumber, IsString, IsPhoneNumber, IsDateString, IsNotEmpty, IsOptional } from 'class-validator';

export class newClientAddressDto {

    @ApiModelProperty()
    @IsNumber()
    client_id: number;

    @ApiModelProperty()
    @IsString()
    full_name: string;

    @ApiModelProperty()
    @IsString()
    @IsPhoneNumber('PH')
    mobile_no: string;

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
    last_transaction_date: string;

    @ApiModelProperty()
    @IsDateString()
    last_date_updated: string;

    @ApiModelProperty()
    @IsDateString()
    date_created: string;
}

export class updateAddressDto {

    @ApiModelProperty()
    @IsString()
    full_name: string;

    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    @IsPhoneNumber('PH')
    mobile_no: string;

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

    // @ApiModelProperty()
    // @IsDateString()
    // last_transaction_date: string;
}