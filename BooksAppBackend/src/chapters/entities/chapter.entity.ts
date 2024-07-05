import { Book } from "src/book/entities/book.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name:"chapters"})
export class Chapter {

  @PrimaryGeneratedColumn("increment")
  id:number;

  @Column()
  title:string;

  @Column()
  content:string;

  @ManyToOne(() => Book, (book) => book.chapters, { onDelete: 'CASCADE' })
  book: Book;

  @CreateDateColumn()
  created_at:Date;

  @UpdateDateColumn()
  updated_at:Date;

}
