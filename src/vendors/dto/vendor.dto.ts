import { ApiModelProperty } from "@nestjs/swagger";
import { IsString, IsEmail, MinLength, MaxLength, IsNumber } from "class-validator";
import { Optional } from "@nestjs/common";

export class newVendorDto{

    @ApiModelProperty()
    @IsString()
    @MinLength(3)
    @MaxLength(70)
    name : string;

    @ApiModelProperty()
    @Optional()
    @IsString()
    @MaxLength(200)
    description ?: string;

    @ApiModelProperty()
    @IsEmail()
    email : string;

    @ApiModelProperty()
    @Optional()
    @IsNumber()
    @MinLength(11)
    @MaxLength(11)
    mobile_no ?: number;
    
    @ApiModelProperty()
    @Optional()
    @IsNumber()
    @MaxLength(7)
    @MinLength(7) 
    telephone_no ?: number;
    
    @ApiModelProperty()
    @IsString()
    days_open : string;

    @ApiModelProperty()
    @IsString()
    days_closed : string;

    @ApiModelProperty()
    @IsString()
    open_hours : string;

    @ApiModelProperty()
    @IsString()
    closed_hours : string;

    @ApiModelProperty()
    @IsString()
    @MaxLength(200)
    address : string;

    @ApiModelProperty()
    @IsString()
    @MaxLength(200)
    city : string;

    @ApiModelProperty()
    @IsString()
    @MaxLength(200)
    business_type : string;

    @ApiModelProperty()
    @IsString()
    account_type : string;

    @ApiModelProperty()
    created_by : number;
}

export class updateVendorDto{

    @ApiModelProperty()
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    name : string;

    @ApiModelProperty()
    @Optional()
    @IsString()
    @MaxLength(200)
    description ?: string;

    @ApiModelProperty()
    @IsEmail()
    email : string;

    @ApiModelProperty()
    @Optional()
    @IsString()
    @MinLength(15)
    @MaxLength(15)
    mobile_no ?: string;
    
    @ApiModelProperty()
    @Optional()
    @IsString()
    @MaxLength(10)
    @MinLength(10) 
    telephone_no ?: string;
    
    @ApiModelProperty()
    @IsString()
    @Optional()
    business_hours ?: string;

    @ApiModelProperty()
    @IsString()
    business_type : string;

    @ApiModelProperty()
    @IsString()
    @MaxLength(200)
    address : string;

    @ApiModelProperty()
    @IsString()
    vendor_type : string;

    @ApiModelProperty()
    @IsString()
    vendor_status : string;
}
