export interface BooksFromAPIResponse {
  data:     Data;
  metadata: Metadata;
}

export interface Data {
  books: BookFromApi[];
}

export interface BookFromApi {
  id:          number;
  title:       string;
  poster:      string;
  avaible:     boolean;
  releaseDate: Date;
  created_at:  Date;
  updated_at:  Date;
  author:      AuthorFromApi;
  chapters:    ChapterFromApi[];
  genres:      GenreFromApi[];
}

export interface AuthorFromApi {
  id:         number;
  name:       string;
  lastName:   string;
  age:        number;
  disabled:   boolean;
  created_at: Date;
  updated_at: Date;
}

export interface ChapterFromApi {
  id:         number;
  title:      string;
  content:    string;
  created_at: Date;
  updated_at: Date;
}

export interface GenreFromApi {
  id:         number;
  name:       string;
  created_at: Date;
  updated_at: Date;
  disabled:   boolean;
}


export interface Metadata {
  limit: number;
  page:  number;
}
