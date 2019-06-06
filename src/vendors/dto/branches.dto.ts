import { ApiModelProperty } from "@nestjs/swagger";
import { IsString, IsEmail, MinLength, MaxLength, IsNumber, IsNotEmpty } from "class-validator";
import { Optional } from "@nestjs/common";
import { Timestamp } from "typeorm";

export class newVendorBranchDto{

    @ApiModelProperty()
    @IsNumber()
    vendor_id : number;

    @ApiModelProperty()
    @IsString()
    @IsNotEmpty()
    mobile_no : string;

    @ApiModelProperty()
    @Optional()
    telephone_no ?: string;

    @ApiModelProperty()
    @IsString()
    @IsNotEmpty()
    business_days : string;

    @ApiModelProperty()
    @IsString()
    @IsNotEmpty()
    open_hours : string;

    @ApiModelProperty()
    @IsString()
    @IsNotEmpty()
    closing_hours : string;

    @ApiModelProperty()
    @IsString()
    @IsNotEmpty()
    address : string;
    
    @ApiModelProperty()
    @IsString()
    @IsNotEmpty()
    city : string;

    @ApiModelProperty()
    @IsNumber()
    created_by : number;
}

export class updateVendorBranchDto{

    @ApiModelProperty()
    @Optional()
    mobile_no ?: string;

    @ApiModelProperty()
    @Optional()
    telephone_no ?: string;

    @ApiModelProperty()
    @Optional()
    business_days ?: string;

    @ApiModelProperty()
    @Optional()
    open_hours ?: Timestamp;

    @ApiModelProperty()
    @Optional()
    closing_hours ?: Timestamp;

    @ApiModelProperty()
    @Optional()
    address ?: string;
    
    @ApiModelProperty()
    @Optional()
    city ?: string;
    
    @ApiModelProperty()
    @IsNumber()
    updated_by : number;
}