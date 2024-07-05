import { Module, forwardRef } from '@nestjs/common';
import { ChaptersService } from './chapters.service';
import { ChaptersController } from './chapters.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chapter } from './entities/chapter.entity';
import { BookModule } from 'src/book/book.module';

@Module({
  controllers: [ChaptersController],
  providers: [ChaptersService],
  imports:[
    forwardRef(() => BookModule),
    TypeOrmModule.forFeature([
      Chapter
    ])
  ],
  exports:[
    TypeOrmModule,
    ChaptersService
  ]
})
export class ChaptersModule {}
