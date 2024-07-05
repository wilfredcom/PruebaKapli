import { Injectable } from '@nestjs/common';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { Repository } from 'typeorm';
import { Chapter } from './entities/chapter.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BookService } from 'src/book/book.service';

@Injectable()
export class ChaptersService {

  constructor(
    @InjectRepository(Chapter)
    private readonly chaptersRepository:Repository<Chapter>,
    private readonly booksService:BookService

  ){}

  async createBulk(
    chapters: Partial<Chapter>[]
  ): Promise<Chapter[]> {
    const createdChapters = this.chaptersRepository.create(chapters);
    return await this.chaptersRepository.save(createdChapters);
  }



  async create(createChapterDto: CreateChapterDto) {

    const { bookId,...restToCreate } = createChapterDto;
    const {data:{book}} = await this.booksService.findOne(bookId);
    const newChapter = this.chaptersRepository.create({
      ...restToCreate,
      book
    });

    await this.chaptersRepository.save(newChapter);

    return {
      message:"Chapter created sucessfully!",
      data:{
        chapter:newChapter
      },
    };
  }

  async clearAll(){
    await this.chaptersRepository.delete({});
  }

  async chaptersByBookId(
    id:number
  ){

    try {
      //Find book by id
      const {data:{book}} = await this.booksService.findOne(id);

      const chapters = await this.chaptersRepository.createQueryBuilder("chapters")
      // .leftJoinAndSelect("chapters.book","book")
      .where("chapters.book.id = :id",{id:book.id})
      .getMany();

      return {
        data:{
          chapters
        },
        metadata:{}
      };
    } catch (error) {
      console.log(error);
    }

  }

}
