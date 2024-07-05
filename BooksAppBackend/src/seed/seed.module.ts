import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { AuthorsModule } from 'src/authors/authors.module';
import { GenresModule } from 'src/genres/genres.module';
import { BookModule } from 'src/book/book.module';
import { ChaptersModule } from 'src/chapters/chapters.module';

@Module({
  imports:[
    AuthorsModule,
    GenresModule,
    BookModule,
    ChaptersModule
  ],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
