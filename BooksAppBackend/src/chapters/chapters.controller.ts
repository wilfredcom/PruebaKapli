import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ChaptersService } from './chapters.service';
import { CreateChapterDto } from './dto/create-chapter.dto';

@Controller('chapters')
export class ChaptersController {

  constructor(private readonly chaptersService: ChaptersService) {}

  @Post()
  create(@Body() createChapterDto: CreateChapterDto) {
    return this.chaptersService.create(createChapterDto);
  }

  @Get("/book/:id")
  getChaptersByBookId(
    @Param("id",ParseIntPipe) id:number
  ){
    return this.chaptersService.chaptersByBookId(id);
  }

}
