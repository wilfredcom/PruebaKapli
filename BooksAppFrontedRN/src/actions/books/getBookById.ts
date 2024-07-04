import { booksApi } from "../../config/api/booksApi"
import { Book } from "../../domain/entities/Books";
import { BookFromAPIResponse } from "../../infrastructure/interfaces/book-api-response.interface";
import { BookMapper } from "../../infrastructure/mappers/book.mapper";

export const getBookById = async(id:number):Promise<Book> => {
  try {
    const { data:resp } = await booksApi.get<BookFromAPIResponse>(`/books/${id}`);
    const book = BookMapper.fromBookApiToEntity(resp.data.book);
    return book;
  } catch (error) {
    throw new Error(`Error fetching book by id ${id}`);
  }

}