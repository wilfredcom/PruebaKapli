import { Injectable } from '@nestjs/common';
import { AuthorsService } from 'src/authors/authors.service';
import { BookService } from 'src/book/book.service';
import { ChaptersService } from 'src/chapters/chapters.service';
import { GenresService } from 'src/genres/genres.service';
import { authors, genres, books, chapters } from './data/data';

@Injectable()
export class SeedService {
  constructor(
    private readonly authorsService: AuthorsService,
    private readonly genresService: GenresService,
    private readonly booksService: BookService,
    private readonly chaptersService: ChaptersService,
  ) {}

  async executeSeed() {

    // Clear all tables
    // await this.chaptersService.clearAll();
    // await this.booksService.clearAll();
    // await this.genresService.clearAll();
    // await this.authorsService.clearAll();

    const authorEntities = await this.authorsService.createBulk(authors);

    const genreEntities = await this.genresService.createBulk(genres);

    const authorsMap = new Map(authorEntities.map(author => [`${author.name} ${author.lastName}`, author]));
    const genresMap = new Map(genreEntities.map(genre => [genre.name, genre]));

    const bookEntities = await this.booksService.createBulk(
      books.map(book => ({
        ...book,
        author: authorsMap.get(book.authorName),
        genres: book.genres.map(genreName => genresMap.get(genreName)),
      })),
    );

    const booksMap = new Map(bookEntities.map(book => [book.title, book]));

    await this.chaptersService.createBulk(
      chapters.map(chapter => ({
        ...chapter,
        book: booksMap.get(chapter.bookTitle),
      })),
    );
  }
}
