import { ApiModelProperty } from "@nestjs/swagger";
import { IsString, IsNumber, IsOptional, IsPositive } from "class-validator";

export class primaryIdDto{

    @ApiModelProperty()
    @IsNumber()
    @IsPositive()
    id : number;
}

export class searchDto{

    @ApiModelProperty()
    @IsString()
    @IsOptional()
    keyword : string = "";

    @ApiModelProperty()
    @IsNumber()
    offset : number = 0;

    @ApiModelProperty()
    @IsNumber()
    @IsPositive()
    limit  : number = 10;
}