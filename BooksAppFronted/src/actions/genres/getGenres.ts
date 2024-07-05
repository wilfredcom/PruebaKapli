import { booksApi } from "../../config/api/booksApi";
import { Genre } from "../../domain/entities/Books";
import { GenresFromAPIResponse } from "../../infrastructure/interfaces/genres-api-response.interface";
import { GenreMapper } from "../../infrastructure/mappers/genre.mapper";

export const getGenres = async(
  page:number = 1,
  limit:number = 10
):Promise<Genre[]> => {

  try {
		const url = `/genres?limit=${limit}&page=${page}`;
		const { data:resp } = await booksApi.get<GenresFromAPIResponse>(url);
    const genres = resp.data.genres.map((genreFromApi) => GenreMapper.fromGenreApiToEntity(genreFromApi));
    return genres;
  } catch (error) {
    console.log(error);
    throw new Error(`Error fetching genres from server`);
  }

}