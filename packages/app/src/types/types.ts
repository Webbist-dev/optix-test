export interface Movie {
  id: number;
  reviews: number[];
  title: string;
  filmCompanyId: number;
  cost: string;
  releaseYear: number;
  averageReviewScore?: number;
}
export interface Company {
  id: number;
  name: string;
}

export interface DataState {
  movies: Movie[];
  companies: Company[];
}

export interface UseFetchDataReturn {
  movies: Movie[];
  companies: Company[];
  loading: boolean;
  error: any;
  refetch: () => void;
}

export interface MoviesTableProps {
  movies: Movie[];
  companies: Company[];
  selectedMovie: Movie | null;
  onOpen: (movie: Movie) => void;
  onRefresh: () => void;
  loading: boolean;
}

export interface FormDialogProps {
  isOpen: boolean;
  selectedMovie: Movie | null;
  onClose: () => void;
  onSubmitSuccess: (message: string) => void;
}

export interface FormValues {
  movieId?: number;
  review: string;
}

export interface ReviewFormProps {
  selectedMovie: Movie | null;
  onClose: () => void;
  onSubmitSuccess: (message: string) => void;
}