export interface BookFromAPIResponse {
  data:     Data;
  metadata: Metadata;
}

export interface Data {
  book: Book;
}

export interface Book {
  id:          number;
  title:       string;
  poster:      string;
  avaible:     boolean;
  releaseDate: Date;
  created_at:  Date;
  updated_at:  Date;
  author:      Author;
  chapters:    Chapter[];
  genres:      Genre[];
}

export interface Author {
  id:         number;
  name:       string;
  lastName:   string;
  age:        number;
  disabled:   boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Chapter {
  id:         number;
  title:      string;
  content:    string;
  created_at: Date;
  updated_at: Date;
}

export interface Genre {
  id:         number;
  name:       string;
  created_at: Date;
  updated_at: Date;
  disabled:   boolean;
}

export interface Metadata {
}
