import React, { useState } from "react";
import {
  Container,
  Stack,
  Box,
  Typography,
  Paper,
  Pagination,
  MenuItem,
  FormControl,
  Select,
  SelectChangeEvent,
  Snackbar,
} from "@mui/material";
import MoviesTable from "./components/MoviesTable";
import FormModal from "./components/FormModal";

import useFetchData from "./hooks/useFetchData";

const App: React.FC = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortBy, setSortBy] = useState("title");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedHeader, setSelectedHeader] = useState<string>("title");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");

  const { movies, companies, loading, error } = useFetchData({
    page,
    pageSize,
    sortBy,
    sortOrder,
  });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (event: SelectChangeEvent) => {
    setPageSize(parseInt(event.target.value));
  };

  const handleSortChange = (field: string) => {
    setSelectedHeader(field);
    if (field === sortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const handleOpen = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedMovie(null);
  };

  const handleSnackbarOpen = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);

    setTimeout(() => {
      setSnackbarOpen(false);
    }, 6000);
  };

  return (
    <Container
      maxWidth="lg"
      component={Paper}
      sx={{
        marginTop: 4,
      }}
    >
      {movies.data.length > 0 && companies.length > 0 && (
        <Stack
          spacing={2}
          sx={{
            paddingTop: 2,
          }}
        >
          <Typography variant="h6">Movie Database</Typography>
          <Stack alignItems={"center"} spacing={2} paddingBottom={2}>
            <MoviesTable
              movies={movies.data}
              companies={companies}
              selectedMovie={selectedMovie}
              selectedHeader={selectedHeader}
              sortOrder={sortOrder}
              onSortChange={handleSortChange}
              onOpen={handleOpen}
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <FormControl size="small">
                  <Select
                    value={`${pageSize}`}
                    onChange={handlePageSizeChange}
                    displayEmpty
                  >
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={25}>25</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                    <MenuItem value={100}>100</MenuItem>
                  </Select>
                </FormControl>
                <Typography variant="body2">
                  Total Movies: {movies.meta.count}
                </Typography>
              </Box>

              <Pagination
                count={movies.meta.totalPages}
                page={movies.meta.page}
                onChange={(_, newPage) => handlePageChange(newPage)}
                color="primary"
                size="large"
                showFirstButton={movies.meta.totalPages > 10}
                showLastButton={movies.meta.totalPages > 10}
              />
            </Box>
          </Stack>
        </Stack>
      )}

      {loading && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 2,
            marginTop: 2,
          }}
        >
          <Typography variant="h6">Loading...</Typography>
        </Box>
      )}
      {error && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 2,
            marginTop: 2,
          }}
        >
          <Typography variant="h6">Error...</Typography>
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
