import { booksApi } from "../../config/api/booksApi";
import { Chapter } from "../../domain/entities/Books";
import { ChaptersFromAPIResponse } from '../../infrastructure/interfaces/chapters-api-response.interface';
import { ChapterMapper } from "../../infrastructure/mappers/chapter.mapper";

export const getChaptersByBookId = async(bookId:number):Promise<Chapter[]> => {

  try {
    const {data:resp} = await booksApi.get<ChaptersFromAPIResponse>(`/chapters/book/${bookId}`);
    const chapters = resp.data.chapters.map(chapterFromApi => ChapterMapper.fromChapterApiToEntiy(chapterFromApi));
    return chapters;
  } catch (error) {
    throw new Error(`Error fetching chapters by book id ${bookId}`);
  }

}