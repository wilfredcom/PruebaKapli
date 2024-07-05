import { IsArray, IsNumber, IsString } from "class-validator";

export class CreateAuthorDto {

  @IsString()
  name:string;

  @IsString()
  lastName:string;

  @IsNumber()
  age:number;

  @IsArray()
  @IsNumber({}, { each: true })
  booksIds: number[];


};
