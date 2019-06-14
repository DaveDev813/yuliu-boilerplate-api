import { ApiModelProperty } from "@nestjs/swagger";
import { IsString, IsEmail, MaxLength, IsNumber, Length, IsOptional, IsArray, IsIn, ArrayUnique, IsMilitaryTime, IsPhoneNumber, ArrayMaxSize, ArrayMinSize, ValidateNested } from "class-validator";

export class newVendorDto{

    @ApiModelProperty()
    @IsString()
    @Length(3, 50)
    name : string;

    @ApiModelProperty()
    @IsEmail()
    email : string;

    @ApiModelProperty()
    @IsString()
    @IsPhoneNumber(`PH`)
    @Length(11, 11)
    mobile_no : string;

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
    @IsIn(["Spa", "Salon", "Clinic", "Barber Shop"])
    business_type : string;

    @ApiModelProperty()
    @IsOptional()
    @IsString()
    @Length(50, 1000)
    description : string;

    @ApiModelProperty()
    @IsOptional()
    @IsPhoneNumber(`PH`)
    @Length(7, 7)
    telephone_no : string;
    
    @ApiModelProperty()
    @IsOptional()
    @IsArray()
    @ArrayUnique()
    @ArrayMinSize(1)
    @ArrayMaxSize(7)
    @ValidateNested(    )
    @IsIn(['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], { each : true })
    days_open : string[];

    @ApiModelProperty()
    @IsOptional()
    @IsMilitaryTime()
    @IsString()
    open_hours : string;


    // @ApiModelProperty()
    // @IsString()
    // account_type : string;

    // @ApiModelProperty()
    // created_by : number;
}

export class updateVendorDto{

    @ApiModelProperty()
    @IsOptional()
    @IsString()
    @Length(3, 50)
    name : string;

    @ApiModelProperty()
    @IsOptional()
    @IsString()
    @IsPhoneNumber(`PH`)
    @Length(11, 11)
    mobile_no : string;

    @ApiModelProperty()
    @IsOptional()
    @IsString()
    @MaxLength(200)
    address : string;

    @ApiModelProperty()
    @IsOptional()
    @IsString()
    @MaxLength(200)
    city : string;

    @ApiModelProperty()
    @IsOptional()
    @IsString()
    @Length(50, 1000)
    description : string;

    @ApiModelProperty()
    @IsOptional()
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

    // @ApiModelProperty()
    // @IsString()
    // account_type : string;

    // @ApiModelProperty()
    // created_by : number;
}
