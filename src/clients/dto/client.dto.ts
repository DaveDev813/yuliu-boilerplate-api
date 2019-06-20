import { IsNotEmpty, IsEmail, IsString, MinLength, MaxLength } from "class-validator";
import { Optional } from "@nestjs/common";
import { ApiModelProperty } from "@nestjs/swagger";

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
    mobile_no : string;

    @ApiModelProperty()
    @IsString()
    last_transaction_date: string;

    @ApiModelProperty()
    @IsString()
    last_date_updated: string;

    @ApiModelProperty()
    @IsString()
    date_created: string;

    @ApiModelProperty()
    @IsString()
    birthday: string;

    @ApiModelProperty()
    @IsString()
    gender: string;

    @ApiModelProperty()
    @IsString()
    isVerified: number;

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
