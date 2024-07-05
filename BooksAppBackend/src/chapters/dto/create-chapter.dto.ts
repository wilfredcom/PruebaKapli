import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateChapterDto {

  @IsString()
  title:string;

  @IsString()
  @IsOptional()
  content:string;

  @IsNumber()
  bookId:number;

};
