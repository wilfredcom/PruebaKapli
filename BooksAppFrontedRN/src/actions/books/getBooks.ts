import { booksApi } from "../../config/api/booksApi";
import { Book } from "../../domain/entities/Books";
// import { Book } from "../../domain/entities/Books";
import { BookFromApi,BooksFromAPIResponse } from '../../infrastructure/interfaces/books-api-respone.interface';
import { BookMapper } from "../../infrastructure/mappers/book.mapper";

export const getBooks = async(
  page:number = 1,
  limit = 20
):Promise<Book[]> => {
  try {
    const url = `/books/?limit=${limit}&page=${page}`;
    const { data:resp } = await booksApi.get<BooksFromAPIResponse>(url);
    const books = resp.data.books.map((bookFromApi:BookFromApi) => {
      const bookMapped:Book = BookMapper.fromBookApiToEntity(bookFromApi);
      return bookMapped;
    });
    return books;
  } catch (error) {
    throw new Error(`Something happend ${error}`);
  }

}