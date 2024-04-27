interface Movie {
  id: number;
  reviews: number[];
  title: string;
  filmCompanyId: number;
  cost: number;
  releaseYear: number;
  averageReviewScore: number;
}

interface Company {
  id: number;
  name: string;
}

interface DataState {
  movies: Movie[];
  companies: Company[];
}

interface UseFetchDataReturn {
  movies: Movie[];
  companies: Company[];
  loading: boolean;
  error: string | null;
}