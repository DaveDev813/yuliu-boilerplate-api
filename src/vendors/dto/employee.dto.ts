import { ApiModelProperty } from "@nestjs/swagger";
import { IsString, IsEmail, MaxLength, Length, IsOptional, IsArray, IsIn, ArrayUnique, IsMilitaryTime, IsPhoneNumber, ArrayMaxSize, ArrayMinSize, ValidateNested, IsNumber, IsPositive, IsBoolean } from "class-validator";

export class newVendorEmployee{

    @ApiModelProperty()
    @IsNumber()
    vendor_id : number;

    @ApiModelProperty()
    @IsNumber()
    branch_id : number;

    @ApiModelProperty()
    @IsOptional()
    @IsString()
    @Length(10, 100)
    employee_code : string;

    @ApiModelProperty()
    @IsString()
    @Length(10, 100)
    employee_name : string;

    @ApiModelProperty()
    @IsOptional()
    @IsPhoneNumber('PH')
    mobile_no : string;

    @ApiModelProperty()
    @IsOptional()
    @IsIn(["Therapist", "Barber", "Others"])
    position : string;

    @ApiModelProperty()
    @IsNumber()
    comission_to_vendor : number;

    @ApiModelProperty()
    @IsOptional()
    @IsNumber()
    overall_rating : number;

    @ApiModelProperty()
    @IsOptional()
    @IsBoolean()
    is_available : boolean;
    
    @ApiModelProperty()
    @IsNumber()
    created_By : number;
}

export class updateVendorEmployee{

    @ApiModelProperty()
    @IsOptional()
    @IsString()
    @Length(10, 100)
    employee_code : string;

    @ApiModelProperty()
    @IsOptional()
    @IsString()
    @Length(10, 100)
    employee_name : string;

    @ApiModelProperty()
    @IsOptional()
    @IsPhoneNumber('PH')
    mobile_no : string;

    @ApiModelProperty()
    @IsOptional()
    @IsIn(["Therapist", "Barber", "Others"])
    position : string;

    @ApiModelProperty()
    @IsOptional()
    @IsNumber()
    comission_to_vendor : number;

    @ApiModelProperty()
    @IsOptional()
    @IsNumber()
    overall_rating : number;

    @ApiModelProperty()
    @IsOptional()
    @IsBoolean()
    is_available : boolean;
    
    @ApiModelProperty()
    @IsNumber()
    updated_by : number;
}
