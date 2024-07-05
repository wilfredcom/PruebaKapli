import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateGenreDto {

	@IsString()
	name:string;

  @IsOptional()
	@IsArray()
	@IsNumber({},{each:true})
	booksIds:number[];

};
