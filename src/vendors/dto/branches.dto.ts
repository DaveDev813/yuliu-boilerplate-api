import { ApiModelProperty } from "@nestjs/swagger";
import { IsString, IsNumber, IsNotEmpty, IsPhoneNumber, IsOptional, Length, IsArray, ArrayUnique, ArrayMinSize, ArrayMaxSize, ValidateNested, IsIn, IsMilitaryTime } from "class-validator";

export class newVendorBranchDto{

    @ApiModelProperty()
    @IsNumber()
    vendor_id : number;

    @ApiModelProperty()
    @IsString()
    @Length(3, 30)
    contact_person : string;

    @ApiModelProperty()
    @IsString()
    @Length(11, 11)
    @IsPhoneNumber(`PH`)
    mobile_no : string;

    @ApiModelProperty()
    @IsString()
    @IsNotEmpty()
    address : string;
    
    @ApiModelProperty()
    @IsString()
    @IsNotEmpty()
    city : string;

    @ApiModelProperty()
    @IsOptional()
    @IsString()
    @IsPhoneNumber(`PH`)
    @Length(7, 7)
    telephone_no : string;

    @ApiModelProperty()
    @IsOptional()
    @IsArray()
    @ArrayUnique()
    @ArrayMinSize(1)
    @ArrayMaxSize(7)
    @ValidateNested()
    @IsIn(['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], { each : true })
    days_open : string[];

    @ApiModelProperty()
    @IsOptional()
    @IsMilitaryTime()
    @IsString()
    open_hours : string;
}

export class updateVendorBranchDto{

    @ApiModelProperty()
    @IsOptional()
    @IsNumber()
    vendor_id : number;

    @ApiModelProperty()
    @IsOptional()
    @IsString()
    @Length(3, 30)
    contact_person : string;

    @ApiModelProperty()
    @IsOptional()
    @IsString()
    @Length(11, 11)
    @IsPhoneNumber(`PH`)
    mobile_no : string;

    @ApiModelProperty()
    @IsOptional()
    @IsString()
    address : string;
    
    @ApiModelProperty()
    @IsOptional()
    @IsString()
    city : string;
    
    @ApiModelProperty()
    @IsOptional()
    @IsString()
    @IsPhoneNumber(`PH`)
    @Length(7, 7)
    telephone_no : string;

    @ApiModelProperty()
    @IsOptional()
    @IsArray()
    @ArrayUnique()
    @ArrayMinSize(1)
    @ArrayMaxSize(7)
    @ValidateNested()
    @IsIn(['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], { each : true })
    days_open : string[];

    @ApiModelProperty()
    @IsOptional()
    @IsMilitaryTime()
    @IsString()
    open_hours : string;

}