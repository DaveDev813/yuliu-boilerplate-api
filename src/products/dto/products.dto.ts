import { ApiModelProperty } from "@nestjs/swagger";
import { IsString, IsNumber } from "class-validator";
import { Optional } from "@nestjs/common";

export class searchProductDto{

    @ApiModelProperty()
    @IsString()
    @Optional()
    keyword : string = "";

    @ApiModelProperty()
    @IsNumber()
    @Optional()
    offset : number = 0;

    @ApiModelProperty()
    @IsNumber()
    @Optional()
    limit  : number = 10;
}

export class newProductDto{

    @ApiModelProperty()
    @IsString()
    product_code : string;

    @ApiModelProperty()
    @IsString()
    product_name : string;

    @ApiModelProperty()
    @IsString()
    @Optional()
    description ?: string;

    @ApiModelProperty()
    @IsString()
    unit_of_measure : string;

    @ApiModelProperty()
    @IsNumber()
    unit_cost : number;
    
    @ApiModelProperty()
    @IsNumber()
    unit_price : number;

    @ApiModelProperty()
    @IsNumber()
    unit_srp : number;
}

export class updateProductDto{

    @ApiModelProperty()
    @IsString()
    product_name : string;

    @ApiModelProperty()
    @IsString()
    @Optional()
    description ?: string;

    @ApiModelProperty()
    @IsString()
    unit_of_measure : string;

    @ApiModelProperty()
    @IsNumber()
    unit_cost : number;
    
    @ApiModelProperty()
    @IsNumber()
    unit_price : number;

    @ApiModelProperty()
    @IsNumber()
    unit_srp : number;
}