import { IsNotEmpty, IsEmail, IsString, MinLength, MaxLength, IsBoolean, IsNumber } from "class-validator";
import { ApiModelProperty } from "@nestjs/swagger";
import { Optional } from "@nestjs/common";

export class signInDto{

  @ApiModelProperty()
  @IsNotEmpty()
  @IsString()
  app_id : string;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsString()
  api_key : string;
}

export class newUserDto{

  @ApiModelProperty()
  @IsNotEmpty()
  @IsString()
  app_origin : string;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsString()
  app_name : string;

  @ApiModelProperty()
  @IsString()
  @Optional()
  description ?: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsBoolean()
  is_logged_in : boolean = false;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsBoolean()
  is_disabled : boolean = false;
}
