export interface ChaptersFromAPIResponse {
  data:     Data;
  metadata: Metadata;
}

export interface Data {
  chapters: ChapterFromApi[];
}

export interface ChapterFromApi {
  id:         number;
  title:      string;
  content:    string;
  created_at: Date;
  updated_at: Date;
}

export interface Metadata {
}
