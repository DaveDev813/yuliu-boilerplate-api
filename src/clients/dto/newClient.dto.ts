import { IsNotEmpty, IsEmail, IsString, MinLength, MaxLength } from "class-validator";
import { Optional } from "@nestjs/common";


export class newClientDto{

    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @MaxLength(20)
    firstname : string;

    @Optional()
    @MaxLength(20)
    middlename : string;

    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @MaxLength(20)
    lastname : string;

    @IsEmail()
    @IsString()
    email : string;

    @IsNotEmpty()
    @IsString()
    @MinLength(7)
    @MaxLength(12)
    contact_no : string;
}