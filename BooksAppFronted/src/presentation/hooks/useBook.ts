import { useEffect, useState } from "react";
import * as UseCases from "../../actions";
import { Book } from "../../domain/entities/Books";

export const useBook = (bookId:number) => {

	const [ isLoading,setIsLoading ] = useState(true);
	const [ bookInfo,setBookInfo ] = useState<Book>();

	useEffect(() => {
		loadBook();
	},[]);

  const loadBook = async() => {
    try {
			const book = await UseCases.getBookById(bookId);
			setBookInfo(book);
			setIsLoading(false);

    } catch (error) {
			throw new Error(`Error fetching book with id ${bookId}`);
    }
  };

  return {
		isLoading,
		bookInfo
  };

}