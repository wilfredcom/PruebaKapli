import { Module } from '@nestjs/common';
import { BookModule } from './book/book.module';
import { ConfigModule } from '@nestjs/config';
import { ChaptersModule } from './chapters/chapters.module';
import { AuthorsModule } from './authors/authors.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenresModule } from './genres/genres.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      ssl:process.env.STAGE === "prod",//Conexion certificada
      extra:{
          ssl:process.env.STAGE === "prod"
          ? { rejectUnauthorized:false }
          : null
      },
      type:"postgres",
      host:process.env.DB_HOST,
      port:+process.env.DB_PORT,
      database:process.env.DB_NAME,
      username:process.env.DB_USERNAME,
      password:process.env.DB_PASSWORD,
      autoLoadEntities:true,
      /*Carga automaticamente las entidades que
      nosotros vamos definiendo poco a poco
      dentro del codigo
      */
      synchronize:true
      /*Production = No
      Cuando creamos algun cambio en nuestras entidades
      automaticamente sincroniza, en pocas palabras
      si autoalizamos una columna o borramos una
      columna automaticamente los registros se actualizaran,
      en production se usa migraciones
      */
    }),
    BookModule,
    ChaptersModule,
    AuthorsModule,
    GenresModule,
    SeedModule,
  ],
})
export class AppModule {}
