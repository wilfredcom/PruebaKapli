import { useEffect, useState } from "react";
import { booksApi } from "../../config/api/booksApi";
import { Book, Chapter } from "../../domain/entities/Books";
import * as UseCases from "../../actions";

export const useChapters = (bookId:number) => {

  const [ isLoading,setIsLoading ] = useState(true);
  const [ chapters,setChapters ] = useState<Chapter[]>([]);
	const [ bookInfo,setBookInfo ] = useState<Book>();

  useEffect(() => {
    initialLoad();
  },[]);

  const initialLoad = async() => {
    //Fetch chapters depending of the book
    const chapters = await UseCases.getChaptersByBookId(bookId);
		const book = await UseCases.getBookById(bookId);
    setBookInfo(book);
    setChapters(chapters);
    setIsLoading(false);
  }

  return {
    isLoading,
    chapters,
    bookInfo
  };
}