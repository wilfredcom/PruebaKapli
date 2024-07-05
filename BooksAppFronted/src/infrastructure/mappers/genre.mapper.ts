import { Genre } from "../../domain/entities/Books";
import { GenreFromApi } from "../interfaces/books-api-respone.interface";
// import { BookMapper } from "./book.mapper";

export class GenreMapper {

  static fromGenreApiToEntity(genreFromApi:GenreFromApi):Genre{

    return {
      id:genreFromApi.id,
      name:genreFromApi.name,
      created_at:genreFromApi.created_at,
      updated_at:genreFromApi.updated_at,
      disabled:genreFromApi.disabled,
      // books:genreFromApi.books.map(bookFromApi => (
      //   BookMapper.fromBookApiToEntity(bookFromApi)
      // ))
    };

  }

};