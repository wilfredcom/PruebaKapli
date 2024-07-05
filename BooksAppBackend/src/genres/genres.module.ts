import { Module } from '@nestjs/common';
import { GenresService } from './genres.service';
import { GenresController } from './genres.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genre } from './entities/genre.entity';
import { BookModule } from 'src/book/book.module';

@Module({
  imports:[
    BookModule,
    TypeOrmModule.forFeature([Genre])
  ],
  controllers: [GenresController],
  providers: [GenresService],
  exports:[
    TypeOrmModule,
    GenresService
  ]
})
export class GenresModule {}
