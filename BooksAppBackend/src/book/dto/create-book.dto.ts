import { IsNumber, IsString, IsBoolean, IsOptional, IsArray } from "class-validator";

export class CreateBookDto {
  
  @IsString()
  title: string;

  @IsString()
  description:string;

  @IsString()
  poster:string;

  @IsString()
  releaseDate: string;

  @IsNumber()
  authorId: number;

  @IsArray()
  @IsNumber({},{each:true})
  genresIds: number[];

  @IsBoolean()
  @IsOptional()
  avaible?: boolean;

}

