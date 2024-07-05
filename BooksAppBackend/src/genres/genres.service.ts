import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Repository } from 'typeorm';
import { Genre } from './entities/genre.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BookService } from 'src/book/book.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class GenresService {
  
	constructor(
		@InjectRepository(Genre)
		private readonly genreRepository:Repository<Genre>,
		private readonly booksService:BookService
	){}

  async createBulk(
    genres: Partial<Genre>[]
  ): Promise<Genre[]> {
    const createdGenres = this.genreRepository.create(genres);
    return await this.genreRepository.save(createdGenres);
  }

  async create(
		createGenreDto: CreateGenreDto
	) {

		const { booksIds,...restToCreate } = createGenreDto;
		const books = [];

		if(booksIds){
			for(const bookId of booksIds){
				const {data:{book}} = await this.booksService.findOne(bookId);
				books.push(book);
			}
		}

		const newGenre = this.genreRepository.create({
			...restToCreate,
			books
		});

		await this.genreRepository.save(newGenre);

		return {
			data:{
				genre:newGenre
			},
			metadata:{
			}
		};

  }

  async findAll(
    paginationDto:PaginationDto
	) {
    const { limit,page,search } = paginationDto;

    const queryBuilder = this.genreRepository.createQueryBuilder("genres")
    .leftJoinAndSelect("genres.books","books")
    .leftJoinAndSelect("books.chapters","chapters")
    .skip((page-1)*limit)
    .take(limit)

    if (search) {
      queryBuilder.andWhere(`LOWER(genres.name) LIKE :name`, { name: `%${search.toLowerCase()}%` });
    }

    const genres = await queryBuilder.getMany();

    return {
      data:{
        genres
      },
      metadata:{
        limit,
        page
      }
    };
  }

  async findOne(id: number) {
    const genre = this.genreRepository.findOneBy({id});
    if(!genre) throw new NotFoundException(`Genre with id ${id} not found!`);
    return genre;
  }

  async update(id: number, updateGenreDto: UpdateGenreDto) {
		  
		const { booksIds,...restToUpdate } = updateGenreDto;

		const books = [];

		if(booksIds){
			for(const bookId of booksIds){
				const {data:{book}} = await this.booksService.findOne(bookId);
				books.push(book);
			}
		}

    const genre = await this.findOne(id);

    const genreUpdated = this.genreRepository.merge(genre,{
			...restToUpdate,
			books
		});

    await this.genreRepository.save(genreUpdated);

    return {
      message:"Genre updated sucessfully!",
      data:{
        genre:genreUpdated
      },
      metadata:{}
    };

  }

  async remove(id: number) {

    const genre = await this.findOne(id);
    const genreUpdated = this.genreRepository.merge(genre,{disabled:true});
    await this.genreRepository.save(genreUpdated);

    return {
      message:"Genre deleted sucessfully!",
      data:{
        genre:genreUpdated
      },
      metadata:{}
    };
  }

  async clearAll(){
    await this.genreRepository.delete({});
  }

}
