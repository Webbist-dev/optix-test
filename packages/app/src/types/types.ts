interface Movies {
  data: Movie[];
  meta: {
    page: number;
    pageSize: number;
    count: number;
    totalPages: number;
  };
}
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
  movies: Movies;
  companies: Company[];
}

interface UseFetchDataReturn {
  movies: Movies;
  companies: Company[];
  loading: boolean;
  error: string | null;
}
