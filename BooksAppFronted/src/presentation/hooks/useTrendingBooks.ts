import { useCallback, useEffect, useState } from "react"
import { Book, Genre } from "../../domain/entities/Books";
import { getGenres } from "../../actions/genres/getGenres";
import { getBooks } from "../../actions";

export const useTrendingBooks = () => {

  const [ isLoading,setIsLoading ] = useState(true);
  const [ genres,setGenres ] = useState<Genre[]>([]);
  const [ trendingBooks,setTrendingBooks ] =useState<Book[]>([]);
  
  const initialLoad = useCallback(async() => {

    const genres = await getGenres();
    const trendingBooks = await getBooks();

    setGenres(genres);
    setTrendingBooks(trendingBooks);
    setIsLoading(false);

  },[]);

  useEffect(() => {
    initialLoad();
  },[]);

  return {
    isLoading,

    genres,
    trendingBooks
  };

}