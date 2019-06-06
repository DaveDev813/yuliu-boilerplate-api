import { ApiModelProperty } from "@nestjs/swagger";
import { IsString, IsNumber } from "class-validator";
import { Optional } from "@nestjs/common";

export class primaryIdDto{

    @ApiModelProperty()
    @IsNumber()
    id : number;
}

export class searchDto{

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