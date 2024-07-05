export interface CreateBookAPIResponse {
  data:    Data;
  message: string;
}

export interface Data {
  book: Book;
}

export interface Book {
  title:       string;
  poster:      string;
  releaseDate: string;
  author:      Author;
  id:          number;
  avaible:     boolean;
  created_at:  Date;
  updated_at:  Date;
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
