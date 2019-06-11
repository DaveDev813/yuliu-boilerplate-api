import { ApiModelProperty } from "@nestjs/swagger";
import { IsString, IsNumber, IsNotEmpty, IsPhoneNumber, IsOptional, Length, IsArray, ArrayUnique, ArrayMinSize, ArrayMaxSize, ValidateNested, IsIn, IsMilitaryTime, IsPositive } from "class-validator";

export class newVendorProduct{

    @ApiModelProperty()
    @IsNumber()
    branch_id : number;

    @ApiModelProperty()
    @IsString()
    @Length(5,100)
    name : string;
    
    @ApiModelProperty()
    @IsOptional()
    @IsString()
    @Length(50, 1000)
    description : string;

    @ApiModelProperty()
    @IsIn(['Service', 'Item', 'Royalty'])
    @IsString()
    product_type : string;

    @ApiModelProperty()
    @IsOptional()
    @IsString()
    @IsMilitaryTime()
    duration : string;

    @ApiModelProperty()
    @IsPositive()
    @IsNumber()
    product_cost : number;

    @ApiModelProperty()
    @IsPositive()
    @IsNumber()
    product_price : number;

    @ApiModelProperty()
    @IsPositive()
    @IsNumber()
    product_comission : number;
}

export class updateVendorProductDto{

    @ApiModelProperty()
    @IsOptional()
    @IsString()
    @Length(5,100)
    name : string;
    
    @ApiModelProperty()
    @IsOptional()
    @IsString()
    @Length(50, 1000)
    description : string;

    @ApiModelProperty()
    @IsOptional()
    @IsIn(['Service', 'Item', 'Royalty'])
    @IsString()
    product_type : string;

    @ApiModelProperty()
    @IsOptional()
    @IsString()
    @IsMilitaryTime()
    duration : string;

    @ApiModelProperty()
    @IsOptional()
    @IsPositive()
    @IsNumber()
    product_cost : number;

    @ApiModelProperty()
    @IsOptional()
    @IsPositive()
    @IsNumber()
    product_price : number;

    @ApiModelProperty()
    @IsOptional()
    @IsPositive()
    @IsNumber()
    product_comission : number;
}