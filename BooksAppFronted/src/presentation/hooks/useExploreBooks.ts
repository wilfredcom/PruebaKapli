import { useEffect, useState } from "react";
import { Book, Genre } from "../../domain/entities/Books";
import * as UseCases from "../../actions/";

export const useExploreBooks = () => {

  const [ isLoading,setIsLoading ] = useState<boolean>(true);
  const [ genres,setGenres ] = useState<Genre[]>([]);
  const [ books,setBooks ] = useState<Book[]>([]);


  const initialLoad = async() => {

    const genres = await UseCases.getGenres();
    const books = await UseCases.getBooks();

    setGenres(genres);
    setBooks(books);
    setIsLoading(false);

  }

  useEffect(() => {
    initialLoad();
  },[]);



  return {
    books,
    genres,
    isLoading,
  };
}