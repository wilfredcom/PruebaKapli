import { Book } from "src/book/entities/book.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name:"authors"})
export class Author {

  @PrimaryGeneratedColumn("increment")
  id:number;

  @Column()
  name:string;
  
  @Column()
  lastName:string;

  @Column()
  age:number;

  @Column({
    type:"bool",
    default:true
  })
  disabled:boolean;

  @OneToMany(
    () => Book,
    (book) => book.author,
    {onDelete:"SET NULL"}
  )
  books:Book[];

  @CreateDateColumn()
  created_at:Date;

  @UpdateDateColumn()
  updated_at:Date;

}
