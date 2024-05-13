import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Paper,
  Divider,
  styled,
} from "@mui/material";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";

import { Movie } from "./types/types";
import MoviesTable from "./components/MoviesTable";
import ErrorScreen from "./components/ErrorScreen";

import useFetchData from "./hooks/useFetchData";

const StyledContainer = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(4),
  padding: theme.spacing(6),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  maxWidth: "lg",
}));

const App: React.FC = () => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const { movies, companies, loading, error, refetch } = useFetchData();

  const handleOpen = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleRefreshData = () => {
    refetch();
  };

  return (
    <StyledContainer component={Paper}>
      <Box
        sx={{ display: "flex", alignItems: "center", gap: 2, marginBottom: 2 }}
      >
        <LocalMoviesIcon color="primary" fontSize="large" />
        <Typography variant="h4">Movie Database</Typography>
      </Box>
      {error ? (
        <ErrorScreen error={error} onRetry={handleRefreshData} />
      ) : (
        <Box sx={{ width: "100%" }}>
          <Divider sx={{ my: 2 }} />
          <MoviesTable
            movies={movies}
            companies={companies}
            selectedMovie={selectedMovie}
            onRefresh={handleRefreshData}
            onOpen={handleOpen}
            loading={loading}
          />
        </Box>
      )}
    </StyledContainer>
  );
};

export default App;
