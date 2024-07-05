import { Chapter } from "../../domain/entities/Books";
import { ChapterFromApi } from '../interfaces/chapters-api-response.interface';

export class ChapterMapper {

  static fromChapterApiToEntiy(chapterFromApi:ChapterFromApi):Chapter{
    return {
      id:chapterFromApi.id,
      title:chapterFromApi.title,
      content:chapterFromApi.content,
      created_at:chapterFromApi.created_at,
      updated_at:chapterFromApi.updated_at,
      bookId:null
    };
  }

};