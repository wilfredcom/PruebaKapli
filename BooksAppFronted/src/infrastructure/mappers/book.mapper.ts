import { Book } from "../../domain/entities/Books";
import { BookFromApi } from "../interfaces/books-api-respone.interface";

export class BookMapper {

  static fromBookApiToEntity(bookFromApi:BookFromApi):Book{

    const bookMapped = {
      id:bookFromApi.id,
      title:bookFromApi.title,
      description:"",
      release_date:bookFromApi?.releaseDate,
      genres:bookFromApi.genres.map(genreFromApi => ({
        id:genreFromApi.id,
        name:genreFromApi.name,
        created_at:genreFromApi.created_at,
        updated_at:genreFromApi.updated_at,
        disabled:genreFromApi.disabled
      })),
      chapters:bookFromApi.chapters.map(chapterFromApi => ({
        id:chapterFromApi.id,
        title:chapterFromApi.title,
        content:chapterFromApi.content,
        created_at:chapterFromApi.created_at,
        updated_at:chapterFromApi.updated_at
      })),
      author:{
        id:bookFromApi.author.id,
        name:bookFromApi.author.name,
        lastName:bookFromApi.author.lastName,
        age:bookFromApi.author.age,
        disabled:bookFromApi.author.disabled
      }
    };

    return bookMapped;

  }

}

