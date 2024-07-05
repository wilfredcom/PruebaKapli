import { Author } from "src/authors/entities/author.entity";
import { Chapter } from "src/chapters/entities/chapter.entity";
import { Genre } from "src/genres/entities/genre.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

// export enum GenreBooks {
//     FICCION = "Ficción",
//     NO_FICCION = "No ficción",
//     INFANTIL_JUVENIL = "Literatura infantil y juvenil",
//     POESIA = "Poesía",
//     TEATRO = "Teatro",
//     ARTE_FOTOGRAFIA = "Arte y fotografía",
//     CIENCIAS_EXACTAS_NATURALES = "Ciencias exactas y naturales",
//     CIENCIAS_SOCIALES = "Ciencias sociales",
//     DEPORTES_OCIO = "Deportes y ocio",
//     RELIGION_ESPIRITUALIDAD = "Religión y espiritualidad",
//     LINGUISTICA_FILOLOGIA = "Lingüística y filología",
//     MUSICA = "Música",
//     CINE_TELEVISION = "Cine y televisión",
//     COMICS_NOVELAS_GRAFICAS = "Cómics y novelas gráficas",
// }

@Entity({name:"books"})
export class Book {

  @PrimaryGeneratedColumn("increment")
  id:number;

  @Column()
  title:string;

  @Column({nullable:true})
  description:string;

  @Column()
  poster:string;

  @OneToMany(
    () => Chapter, 
    (chapter) => chapter.book, 
    {
      cascade: true,
      onDelete: 'CASCADE',
    }
  )
  chapters: Chapter[];

  @ManyToOne(
    () => Author,
    (author) => author.books,
    {onDelete:"SET NULL"}
  )
  author:Author;

  @ManyToMany(
    () => Genre,
    (genre) => genre.books,
    {onDelete:"SET NULL",cascade:true}
  )
  @JoinTable({name:"genres_books"})
  genres: Genre[];

  @Column({
    type:"bool",
    default:true
  })
  avaible:boolean;

  @Column()
  releaseDate:string;

  @CreateDateColumn()
  created_at:Date;

  @UpdateDateColumn()
  updated_at:Date;

}
