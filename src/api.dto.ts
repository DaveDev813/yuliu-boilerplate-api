import { ApiModelProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class APIDto{

    @ApiModelProperty()
    @IsString()
    jwt : string;

    @ApiModelProperty()
    @IsString()
    payload : string;
}