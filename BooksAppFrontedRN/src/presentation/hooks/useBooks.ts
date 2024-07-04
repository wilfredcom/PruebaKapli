import { useCallback, useEffect, useState } from "react"
import { Book } from "../../domain/entities/Books";
import * as UseCases from "../../actions";


export const useBooks = () => {

  const [isLoading,setIsLoading] = useState(true);
  const [ popularBooks,setPopularBooks ] = useState<Book[]>([]);
  const [ topRatedBooks,setTopRatedBooks ] = useState<Book[]>([]);
  const [ forYouBooks,setForYouBooks ] = useState<Book[]>([]);
  const [ booksCreatedByMe, setBooksCreatedByMe ] = useState<Book[]>([]);
  const [ booksUser,setBooksUser ] = useState<Book[]>([]);


  const initialLoad = useCallback(async() => {
    const books = await UseCases.getBooks();
    const booksCreatedByMe = await UseCases.getBooksByAuthorId(1);

    setPopularBooks(books);
    setTopRatedBooks(books);
    setForYouBooks(books);
    setBooksUser(books);
    setBooksCreatedByMe(booksCreatedByMe);

    setIsLoading(false);

  },[]);

  useEffect(() => {
    initialLoad();
  },[]);

  

  return {
    isLoading,

    popularBooks,
    topRatedBooks,
    forYouBooks,
    booksUser,
  booksCreatedByMe
  };

}