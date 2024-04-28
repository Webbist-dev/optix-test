interface PaginationParams {
  page: number;
  pageSize: number;
  sortBy: string;
  sortOrder: "asc" | "desc";
}

interface PaginationMeta {
  page: number;
  pageSize: number;
  count: number;
  totalPages: number;
}

interface PaginatedData<T> {
  data: T[];
  meta: PaginationMeta;
}

interface Movies extends PaginatedData<Movie> {}

interface Movie {
  id: number;
  title: string;
  reviews: number[];
  filmCompanyId: number;
  cost: string;
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

interface MoviesTableProps {
  movies: Movie[];
  companies: Company[];
  sortOrder: "asc" | "desc";
  selectedHeader: string;
  selectedMovie: Movie | null;
  onSortChange: (field: string) => void;
  onOpen: (movie: Movie) => void;
}

interface FormDialogProps {
  isOpen: boolean;
  selectedMovie: Movie | null;
  onClose: () => void;
  onSubmitSuccess: (message: string) => void;
}

interface FormValues {
  movieId?: number;
  rating: number;
  review: string;
}
