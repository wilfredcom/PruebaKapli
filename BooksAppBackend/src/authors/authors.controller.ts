import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('authors')
export class AuthorsController {

  constructor(private readonly authorsService: AuthorsService) {}

  @Post()
  create(
    @Body() createAuthorDto: CreateAuthorDto
  ) {
    return this.authorsService.create(createAuthorDto);
  }

  @Get()
  findAll(
    @Query() paginationDto:PaginationDto
  ) {
    return this.authorsService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(
    @Param('id',ParseIntPipe) id: number
  ) {
    return this.authorsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id',ParseIntPipe) id: number, 
    @Body() updateAuthorDto: UpdateAuthorDto
  ) {
    return this.authorsService.update(id, updateAuthorDto);
  }

  @Delete(':id')
  remove(
    @Param('id',ParseIntPipe) id: number
  ) {
    return this.authorsService.remove(id);
  }
}
