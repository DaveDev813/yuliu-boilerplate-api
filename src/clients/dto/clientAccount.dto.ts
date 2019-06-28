import { Length, IsEmail, IsNotEmpty } from "class-validator";
import { ApiModelProperty } from "@nestjs/swagger";

export class RegisterClientAccount{

    @ApiModelProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiModelProperty()
    @Length(10, 20)
    password: string;
  }
