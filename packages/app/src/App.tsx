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
  Checkbox,
  FormGroup,
  FormControlLabel,
  Divider,
} from "@mui/material";
import {
  Movie,
} from "./types/types";
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
  const [showCost, setShowCost] = useState<boolean>(false);
  const [showReleaseYear, setShowReleaseYear] = useState<boolean>(false);

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
        <Box>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={4}
            sx={{
              paddingTop: 2,
              paddingBottom: 2,
            }}
          >
            <Box>
              <Typography variant="h6">Optix | Technical test</Typography>
              <Typography variant="subtitle2">
                Alex Bennett |{" "}
                <a
                  href="mailto:info@alex-bennett.co.uk"
                  style={{ color: "#1976d2" }}
                >
                  info@alex-bennett.co.uk
                </a>{" "}
                |{" "}
                <a href="tel:07514279404" style={{ color: "#1976d2" }}>
                  07514279404
                </a>
              </Typography>
            </Box>
            <FormGroup>
              <FormControlLabel
                labelPlacement="start"
                label="Show budget"
                control={<Checkbox />}
                onChange={(_, value) => setShowCost(value)}
              ></FormControlLabel>
              <FormControlLabel
                labelPlacement="start"
                label="Show release year"
                control={<Checkbox />}
                onChange={(_, value) => setShowReleaseYear(value)}
              ></FormControlLabel>
            </FormGroup>
          </Stack>
          <Divider />
          <Stack spacing={2} paddingBottom={2}>
            <MoviesTable
              movies={movies.data}
              companies={companies}
              selectedMovie={selectedMovie}
              selectedHeader={selectedHeader}
              sortOrder={sortOrder}
              showCost={showCost}
              showReleaseYear={showReleaseYear}
              onSortChange={handleSortChange}
              onOpen={handleOpen}
            />
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Stack direction="row" alignItems="center" spacing={2}>
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
              </Stack>

              <Pagination
                count={movies.meta.totalPages}
                page={movies.meta.page}
                onChange={(_, newPage) => handlePageChange(newPage)}
                color="primary"
                size="large"
                showFirstButton={movies.meta.totalPages > 10}
                showLastButton={movies.meta.totalPages > 10}
              />
            </Stack>
          </Stack>
        </Box>
      )}

      {loading && (
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={4}
        >
          <Typography variant="h6">Loading...</Typography>
        </Stack>
      )}
      {error && (
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={4}
        >
          <Typography variant="h6">Error...</Typography>
        </Stack>
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
