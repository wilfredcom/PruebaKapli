import { Module, forwardRef } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { AuthorsModule } from 'src/authors/authors.module';

@Module({
  controllers: [BookController],
  providers: [BookService],
  imports:[
    forwardRef(() => AuthorsModule),
    TypeOrmModule.forFeature([Book]),
  ],
  exports:[
    TypeOrmModule,
    BookService,
  ]
})
export class BookModule {}
