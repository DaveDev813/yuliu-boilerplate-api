export class newVendorUserDto{
    
    @ApiModelProperty()
    @IsString()
    vendor_id : string;

    @ApiModelProperty()
    @IsString()
    @MaxLength(15)
    employee_id : string;

    @ApiModelProperty()
    @string()
    @MinLength(5)
    @MaxLength(15)
    username : string;

    @ApiModelProperty()
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    firstname : string;

    @ApiModelProperty()
    @IsString()
    @Optional()
    @MaxLength(20)
    middlename ?: string;

    @ApiModelProperty()
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    lastname : string;

    @ApiModelProperty()
    @IsString()
    password : string;

    @ApiModelProperty()
    @IsEmail()
    email : string;

    @ApiModelProperty()
    @Optional()
    @IsString()
    @MinLength(15)
    @MaxLength(15)
    mobile_no ?: string;
}

export class updateVendorUserDto{
    
    @ApiModelProperty()
    @string()
    @MinLength(5)
    @MaxLength(15)
    username : string;

    @ApiModelProperty()
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    firstname : string;

    @ApiModelProperty()
    @IsString()
    @Optional()
    @MaxLength(20)
    middlename ?: string;

    @ApiModelProperty()
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    lastname : string;

    @ApiModelProperty()
    @IsString()
    password : string;

    @ApiModelProperty()
    @IsEmail()
    email : string;

    @ApiModelProperty()
    @Optional()
    @IsString()
    @MinLength(15)
    @MaxLength(15)
    mobile_no ?: string;
}