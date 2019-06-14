import { IsNotEmpty, IsString, IsOptional, IsDate, Length } from "class-validator";
import { ApiModelProperty } from "@nestjs/swagger";

export class newUserDto{

  @ApiModelProperty()
  @IsNotEmpty()
  @IsString()
  @Length(10, 100)
  app_name : string;

  @ApiModelProperty()
  @IsOptional()
  @IsString()
  @Length(50, 1000)
  description : string;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsString()
  app_origin : string;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsDate()
  app_token_validity : string;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsDate()
  api_key_validity : string;
}
