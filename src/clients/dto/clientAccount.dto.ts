import { Length, IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ApiModelProperty } from "@nestjs/swagger";

export class RegisterClientAccount{

    @ApiModelProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiModelProperty()
    @Length(10, 20)
    firstname : string;

    @ApiModelProperty()
    @Length(10, 20)
    lastname : string;

    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    mobileNo: string;

    @ApiModelProperty()
    @Length(10, 20)
    password: string;
  }

