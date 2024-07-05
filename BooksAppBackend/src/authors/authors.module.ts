import { Module, forwardRef } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsController } from './authors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { BookModule } from 'src/book/book.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Author]),
    forwardRef(() => BookModule)
  ],
  controllers: [AuthorsController],
  providers: [AuthorsService],
  exports:[
    TypeOrmModule,
    AuthorsService
  ]
})
export class AuthorsModule {}
