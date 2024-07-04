export interface Book {
  id:number;
  title:string;
  description?:string;
  genres:Genre[];
  chapters:Chapter[];
  author:Author;
  release_date:string;
}

export interface Chapter {
  id:number;
  title:string;

  content:string;
  // bookId:Book;
  bookId:number | null;
  created_at:Date;
  updated_at:Date;
}

export interface Author {
  id:number;
  name:string;
  lastName:string;
  age:number;
  disabled:boolean;
  // books:Book[];
  // created_at:Date;
  // updated_at:Date;
}

export interface Genre {

  id:number;
	name:string;
	created_at:Date;
	updated_at:Date;
	disabled:boolean;

};
