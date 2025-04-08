export interface Movie {
  id: string;
  title: string;
  genre: string[];
  imgPath: string;
  description: string;
  duration: string;
  userRating: number;
  trailerUrl: string;
  year: number;
  name?: string;
  language?: string;
}

export interface SearchFilters {
  genre?: string;
  userRating?: number;
  name?: string;
  language?: string;
}

export interface MovieResponse {
  data: Movie[];
  total: number;
  page: number;
  size: number;
}