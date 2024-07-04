export interface GenresFromAPIResponse {
  data:     Data;
  metadata: Metadata;
}

export interface Data {
  genres: GenreFromApi[];
}

export interface GenreFromApi {
  id:         number;
  name:       string;
  created_at: Date;
  updated_at: Date;
  disabled:   boolean;
  books:      Book[];
}

export interface Book {
  id:          number;
  title:       Title;
  poster:      string;
  avaible:     boolean;
  releaseDate: Date;
  created_at:  Date;
  updated_at:  Date;
  chapters:    Chapter[];
}

export interface Chapter {
  id:         number;
  title:      string;
  content:    string;
  created_at: Date;
  updated_at: Date;
}

export enum Title {
  AGameOfThrones = "A Game of Thrones",
  HarryPotterAndTheSorcererSStone = "Harry Potter and the Sorcerer's Stone",
  OnePiece = "One Piece",
  TheHobbit = "The Hobbit",
}

export interface Metadata {
  limit: number;
  page:  number;
}
