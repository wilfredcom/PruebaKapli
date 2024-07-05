import { Type } from "class-transformer";
import { IsOptional, IsPositive, IsString, Min } from "class-validator";

export class PaginationDto {

  @IsOptional()
  @IsPositive()
  @Type(() => Number) // enableImplicitConversions:true
  limit?:number = 10;

  @IsOptional()
  @Min(0)
  @Type(() => Number) // enableImplicitConversions:true
  offset?:number = 0;

  @IsOptional()
  @Min(1)
  @Type(() => Number)
  page?:number = 1;

  @IsOptional()
  @IsString()
  search?:string;

};