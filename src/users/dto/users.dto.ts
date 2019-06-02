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
  @MinLength(10)
  @MaxLength(100)
  app_name : string;

  @ApiModelProperty()
  @IsString()
  @Optional()
  @MaxLength(500)
  description ?: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsString()
  app_origin : string;

  @ApiModelProperty()
  @IsNotEmpty()
  app_token_validity : string;

  @ApiModelProperty()
  @IsNotEmpty()
  api_key_validity : string;
}
