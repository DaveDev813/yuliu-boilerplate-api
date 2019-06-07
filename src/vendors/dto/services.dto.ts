import { ApiModelProperty } from "@nestjs/swagger";
import { IsString, IsNumber, IsNotEmpty, IsOptional, Length, IsMilitaryTime, IsPositive } from "class-validator";

export class newVendorServiceDto{

    @ApiModelProperty()
    @IsNumber()
    @IsNotEmpty()
    vendor_id : number;

    @ApiModelProperty()
    @IsNumber()
    @IsNotEmpty()
    branch_id : number;

    @ApiModelProperty()
    @IsString()
    @Length(20, 100)
    name : string;    

    @ApiModelProperty()
    @IsOptional()
    @IsString()
    @Length(50, 1000)
    description : string;    

    @ApiModelProperty()
    @IsOptional()
    @IsMilitaryTime()
    duration : string;

    @ApiModelProperty()
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    original_price : number;
    
    @ApiModelProperty()
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    retail_price : number;

    @ApiModelProperty()
    @IsOptional()
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    percent_comission : number;

    @ApiModelProperty()
    @IsOptional()
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    rating : number;
}

export class updateVendorServiceDto{

    @ApiModelProperty()
    @IsOptional()
    @IsNumber()
    @IsNotEmpty()
    branch_id : number;

    @ApiModelProperty()
    @IsOptional()
    @IsString()
    @Length(20, 100)
    name : string;    

    @ApiModelProperty()
    @IsOptional()
    @IsString()
    @Length(50, 1000)
    description : string;    

    @ApiModelProperty()
    @IsOptional()
    @IsMilitaryTime()
    duration : string;

    @ApiModelProperty()
    @IsOptional()
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    original_price : number;
    
    @ApiModelProperty()
    @IsOptional()
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    retail_price : number;

    @ApiModelProperty()
    @IsOptional()
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    percent_comission : number;

    @ApiModelProperty()
    @IsOptional()
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    rating : number;
}