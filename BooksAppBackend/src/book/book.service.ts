import { Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthorsService } from 'src/authors/authors.service';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class BookService {

  constructor(
    @InjectRepository(Book)
    private readonly booksRepository:Repository<Book>,

    @Inject(forwardRef(() => AuthorsService))
    private readonly authorService:AuthorsService
  ){}

  async createBulk(
    books: Partial<Book>[]
  ): Promise<Book[]> {
    const createdBooks = this.booksRepository.create(books);
    return await this.booksRepository.save(createdBooks);
  }

  async create(createBookDto: CreateBookDto) {

    const { authorId,...restToCreate } = createBookDto;

    const author = await this.authorService.findOne(authorId);

    const newBook = this.booksRepository.create({
      ...restToCreate,
      author
    });

    await this.booksRepository.save(newBook);

    return {
      data:{
        book:newBook
      },
      message:"Book created successfully!"
    }

  }

  async findAll(
    paginationDto:PaginationDto,
  ) {
    const { limit,page,search } = paginationDto;

    const queryBuilder = this.booksRepository.createQueryBuilder("books")
    .leftJoinAndSelect("books.author","authors")
    .leftJoinAndSelect("books.chapters","chapters")
    .leftJoinAndSelect("books.genres","genres")
    .where("books.avaible = :avaible", { avaible: true })
    .skip((page-1)*limit)
    .take(limit)

    if (search) {
      queryBuilder.andWhere(`LOWER(books.title) LIKE :title`, { title: `%${search.toLowerCase()}%` });
    }

    const books = await queryBuilder.getMany();

    return {
      data:{
        books
      },
      metadata:{
        limit,
        page
      }
    };
  }

  async findAllBooksByAuthorId(id: number) {
    const queryBuilder = this.booksRepository.createQueryBuilder('books')
      .innerJoinAndSelect('books.author', 'author')
      .leftJoinAndSelect('books.chapters', 'chapters')
      .leftJoinAndSelect('books.genres', 'genres')
      .where('books.avaible = :avaible', { avaible: true })
      .andWhere('author.id = :authorId', { authorId: id });

    const books = await queryBuilder.getMany();

    return {
      data: {
        books,
      },
    };
  }


  async findOne(id: number) {

    const book = await this.booksRepository.createQueryBuilder("books")
    .leftJoinAndSelect("books.author","authors")
    .leftJoinAndSelect("books.chapters","chapters")
    .leftJoinAndSelect("books.genres","genres")
    .where("books.id = :id",{id})
    .getOne();

    if(!book) throw new NotFoundException(`Book with id ${id} not found!`);

    return {
      data:{
        book
      },
      metadata:{
      }
    }
  }

  async update(
    id: number, 
    updateBookDto: UpdateBookDto
  ) {
    const { data:{book} } = await this.findOne(id);
    const bookUpdated = this.booksRepository.merge(book,updateBookDto);
    this.booksRepository.save(bookUpdated);

    return {
      message:"Book updated successfully!",
      data:{
        book:bookUpdated
      },
      metadata:{
      }
    }
  }

  async remove(id: number) {
    const { data:{book} } = await this.findOne(id);
    const bookUpdated = this.booksRepository.merge(book,{avaible:false});
    await this.booksRepository.save(bookUpdated);
    return {
      message:"Book deleted successfully!",
      data:{
        book:bookUpdated
      },
      metadata:{
      }
    };
  }

  async clearAll(){
    await this.booksRepository.delete({});
  }

}
