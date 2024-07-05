import { Book } from "src/book/entities/book.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name:"genres"})
export class Genre {

  @PrimaryGeneratedColumn("increment")
  id:number;

	@Column()
	name:string;

  @ManyToMany(() => Book, (book) => book.genres, { onDelete: 'CASCADE' })
  books: Book[];

  @CreateDateColumn()
  created_at:Date;

  @UpdateDateColumn()
  updated_at:Date;
  
  @Column({
    type:"bool",
    default:false
  })
  disabled:boolean;


}
