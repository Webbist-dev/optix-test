export interface PaginationParams {
  page: number;
  pageSize: number;
  sortBy: string;
  sortOrder: "asc" | "desc";
}

export interface PaginationMeta {
  page: number;
  pageSize: number;
  count: number;
  totalPages: number;
}

export interface PaginatedData<T> {
  data: T[];
  meta: PaginationMeta;
}

export interface Movies extends PaginatedData<Movie> {}

export interface Movie {
  id: number;
  title: string;
  reviews: number[];
  filmCompanyId: number;
  cost: string;
  releaseYear: number;
  averageReviewScore: number;
}

export interface Company {
  id: number;
  name: string;
}

export interface DataState {
  movies: Movies;
  companies: Company[];
}

export interface UseFetchDataReturn {
  movies: Movies;
  companies: Company[];
  loading: boolean;
  error: string | null;
}

export interface MoviesTableProps {
  movies: Movie[];
  companies: Company[];
  sortOrder: "asc" | "desc";
  selectedHeader: string;
  selectedMovie: Movie | null;
  showCost: boolean;
  showReleaseYear: boolean;
  onSortChange: (field: string) => void;
  onOpen: (movie: Movie) => void;
}

export interface FormDialogProps {
  isOpen: boolean;
  selectedMovie: Movie | null;
  onClose: () => void;
  onSubmitSuccess: (message: string) => void;
}

export interface FormValues {
  movieId?: number;
  rating: number;
  review: string;
}
