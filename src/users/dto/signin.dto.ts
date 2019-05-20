import { IsNotEmpty } from "class-validator";

export class signInDto {

  @IsNotEmpty()
  appId : string;

  @IsNotEmpty()
  apiKey : string;
}