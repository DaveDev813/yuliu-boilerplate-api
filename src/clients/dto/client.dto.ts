import { IsNotEmpty, IsEmail, IsString, MinLength, MaxLength, IsBoolean, IsNumber } from "class-validator";
import { Optional } from "@nestjs/common";
import { ApiModelProperty } from "@nestjs/swagger";

export class searchClientDto{

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

export class newClientDto{

    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @MaxLength(20)
    firstname : string;

    @ApiModelProperty()
    @Optional()
    @MaxLength(20)
    middlename : string;

    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @MaxLength(20)
    lastname : string;

    @ApiModelProperty()
    @IsEmail()
    @IsString()
    email : string;

    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    @Optional()
    telephone_no ?: string;

    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    mobile_no : string;
    
    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    address : string;

    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    zip_code : string;    

    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    city : string;
}

export class updateClientDto{

    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(20)
    firstname : string;

    @ApiModelProperty()
    @Optional()
    @MaxLength(20)
    middlename ?: string;

    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(20)
    lastname : string;

    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    @Optional()
    telephone_no ?: string;

    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    mobile_no : string;
    
    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    address : string;

    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    zip_code : string;    

    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    city : string;
}
