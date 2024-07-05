import { Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Repository } from 'typeorm';
import { Author } from './entities/author.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BookService } from 'src/book/book.service';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class AuthorsService {
  
  constructor(
    @InjectRepository(Author)
    private readonly authorsRepository:Repository<Author>,

    @Inject(forwardRef(() => BookService))
    private readonly booksService:BookService,

  ){}

  async createBulk(
    authors: Partial<Author>[]
  ): Promise<Author[]> {
    const createdAuthors = this.authorsRepository.create(authors);
    return await this.authorsRepository.save(createdAuthors);
  }

  async create(createAuthorDto: CreateAuthorDto) {

    const { booksIds,...restToCreate } = createAuthorDto;

    const books = [];
    for(const bookId of booksIds){
      const {data:{book}} = await this.booksService.findOne(bookId)
      books.push(book);
    }

    const newAuthor = this.authorsRepository.create({
      ...restToCreate,
      books
    });

    await this.authorsRepository.save(newAuthor);

    return {
      message:"Author created successfully!",
      data:{
        author:newAuthor
      },
      metadata:{}
    };

  }

  async findAll(
    paginationDto:PaginationDto
  ) {
    const { limit,page,search } = paginationDto;

    const queryBuilder = this.authorsRepository.createQueryBuilder("authors")
    .leftJoinAndSelect("authors.books","books")
    .leftJoinAndSelect("books.chapters","chapters")
    .skip((page-1)*limit)
    .take(limit)

    if (search) {
      queryBuilder.andWhere(`LOWER(authors.name) LIKE :name`, { name: `%${search.toLowerCase()}%` });
    }

    const authors = await queryBuilder.getMany();

    return {
      data:{
        authors
      },
      metadata:{
        limit,
        page
      }
    };

  }

  async findOne(id: number) {
    const author = this.authorsRepository.findOneBy({id});
    if(!author) throw new NotFoundException(`Author with id ${id} not found!`);
    return author;
  }

  async update(
    id: number, 
    updateAuthorDto: UpdateAuthorDto
  ) {

    const author = await this.findOne(id);

    const authorUpdated = this.authorsRepository.merge(author,updateAuthorDto);

    await this.authorsRepository.save(authorUpdated);

    return {
      message:"Author updated sucessfully!",
      data:{
        author:authorUpdated
      },
      metadata:{}
    };

  }

  async remove(id: number) {

    const author = await this.findOne(id);
    const authorUpdated = this.authorsRepository.merge(author,{disabled:false});
    await this.authorsRepository.save(authorUpdated);

    return {
      message:"Author deleted sucessfully!",
      data:{
        author:authorUpdated
      },
      metadata:{}
    };
  }

  async clearAll(){
    await this.authorsRepository.delete({});
  }

}
