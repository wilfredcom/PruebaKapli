import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @Get()
  findAll(
		@Query() paginationDto:PaginationDto,
  ) {
    return this.bookService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(
    @Param('id',ParseIntPipe) id:number
  ) {
    return this.bookService.findOne(id);
  }

  @Get('/author/:id')
  findAllBooksByAuthorId(
    @Param('id',ParseIntPipe) id:number
  ) {
    return this.bookService.findAllBooksByAuthorId(id);
  }



  @Patch(':id')
  update(
    @Param('id',ParseIntPipe) id: number, 
    @Body() updateBookDto: UpdateBookDto
  ) {
    return this.bookService.update(id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id',ParseIntPipe) id: number) {
    return this.bookService.remove(id);
  }

}
