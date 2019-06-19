import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsPositive } from 'class-validator';

// tslint:disable-next-line:class-name
export class primaryIdDto {
  @ApiModelProperty()
  @IsNumber()
  id: number;
}

// tslint:disable-next-line:max-classes-per-file
export class searchDto {
  @ApiModelProperty()
  @IsString()
  @IsOptional()
  keyword: string = '';

  @ApiModelProperty()
  @IsNumber()
  offset: number = 0;

  @ApiModelProperty()
  @IsNumber()
  @IsPositive()
  limit: number = 10;
}
