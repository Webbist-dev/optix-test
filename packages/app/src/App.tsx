import React, { useState, useCallback } from "react";
import {
  Container,
  Stack,
  Box,
  Typography,
  Paper,
  Button,
  Snackbar,
  Divider,
} from "@mui/material";
import { Movie } from "./types/types";
import MoviesTable from "./components/MoviesTable";
import FormModal from "./components/FormModal";

import useFetchData from "./hooks/useFetchData";

const App: React.FC = () => {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [selectedHeader, setSelectedHeader] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");

  const { movies, companies, loading, error, refetch } = useFetchData();

  const handleOpen = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedMovie(null);
  };

  const handleSortChange = useCallback(
    (field: string) => {
      setSortOrder((prevSortOrder) =>
        prevSortOrder === "asc" ? "desc" : "asc"
      );
      setSelectedHeader(field);
      movies.sort((a, b) => {
        const aValue = a[field];
        const bValue = b[field];
        if (aValue < bValue) {
          return sortOrder === "asc" ? 1 : -1;
        } else if (aValue > bValue) {
          return sortOrder === "asc" ? -1 : 1;
        }
        return 0;
      });
    },
    [sortOrder]
  );

  const handleSnackbarOpen = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);

    setTimeout(() => {
      setSnackbarOpen(false);
    }, 6000);
  };

  const handleRefreshData = () => {
    refetch();
  };

  return (
    <Container
      maxWidth="lg"
      component={Paper}
      sx={{ marginTop: 4, padding: 6 }}
    >
      <Button
        variant="outlined"
        onClick={handleRefreshData}
        sx={{ marginBottom: 2 }}
      >
        Refresh Data
      </Button>
      {loading ? (
        <Typography variant="h6">Loading...</Typography>
      ) : error ? (
        <Typography variant="h6">
          {error.message}: {error.code}
        </Typography>
      ) : (
        <Box>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={4}
            sx={{ paddingTop: 2, paddingBottom: 2 }}
          >
            <Typography variant="subtitle2">
              Total number of movies: {movies.length}
            </Typography>
          </Stack>
          <Divider />
          <MoviesTable
            movies={movies}
            companies={companies}
            selectedMovie={selectedMovie}
            selectedHeader={selectedHeader}
            onSortChange={handleSortChange}
            onOpen={handleOpen}
            sortOrder={sortOrder}
          />
        </Box>
      )}

      <FormModal
        isOpen={isOpen}
        selectedMovie={selectedMovie}
        onClose={handleClose}
        onSubmitSuccess={handleSnackbarOpen}
      />
      <Snackbar open={snackbarOpen} message={snackbarMessage} />
    </Container>
  );
};

export default App;
