import React, { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  TableSortLabel,
  IconButton,
  CircularProgress,
  Dialog,
  DialogContent,
  styled,
  useTheme,
  useMediaQuery,
  Snackbar,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import ReviewForm from "./ReviewForm";
import { Movie, MoviesTableProps } from "../types/types";

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  margin: theme.spacing(2),
  marginTop: theme.spacing(4),
  [`& .MuiTableCell-head`]: {
    fontWeight: "bold",
    backgroundColor: theme.palette.grey[200],
  },
}));

const MoviesTable: React.FC<MoviesTableProps> = ({
  movies,
  companies,
  selectedMovie,
  onOpen,
  onRefresh,
  loading,
}) => {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedHeader, setSelectedHeader] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const getCompanyName = (companyId: number): string => {
    const company = companies.find((c) => c.id === companyId);
    return company ? company.name : "unknown";
  };

  const calculateAverageScore = (movie: Movie) => {
    const totalScore = movie.reviews.reduce((acc, review) => acc + review, 0);
    return movie.reviews.length > 0
      ? (totalScore / movie.reviews.length).toFixed(1)
      : "N/A";
  };

  const handleOpen = (movie: Movie) => {
    onOpen(movie);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSuccess = (message: string) => {
    setIsOpen(false);
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const onSortChange = (field: string) => {
    if (selectedHeader === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSelectedHeader(field);
      setSortOrder("asc");
    }
  };

  const sortedMovies = useMemo(() => {
    return [...movies].sort((a, b) => {
      const aVal =
        selectedHeader === "averageReviewScore"
          ? parseFloat(calculateAverageScore(a))
          : a[selectedHeader];
      const bVal =
        selectedHeader === "averageReviewScore"
          ? parseFloat(calculateAverageScore(b))
          : b[selectedHeader];
      if (aVal < bVal) {
        return sortOrder === "asc" ? -1 : 1;
      } else if (aVal > bVal) {
        return sortOrder === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [movies, sortOrder, selectedHeader]);

  return (
    <StyledTableContainer>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 2,
        }}
      >
        <Typography variant="h6">Movies List</Typography>
        <IconButton onClick={onRefresh} color="primary" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : <RefreshIcon />}
        </IconButton>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Movie Title</TableCell>
            <TableCell>
              <TableSortLabel
                active={selectedHeader === "averageReviewScore"}
                direction={sortOrder}
                onClick={() => onSortChange("averageReviewScore")}
              >
                Average Review Score
              </TableSortLabel>
            </TableCell>
            <TableCell>Production Company</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedMovies.map((movie) => (
            <TableRow
              key={movie.id}
              hover
              selected={selectedMovie?.id === movie.id}
              onClick={() => handleOpen(movie)}
            >
              <TableCell component="th" scope="row">
                {movie.title}
              </TableCell>
              <TableCell>{calculateAverageScore(movie)}</TableCell>
              <TableCell>{getCompanyName(movie.filmCompanyId)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {isOpen && (
        <Box sx={{ mt: 2 }}>
          {isMobile ? (
            <Dialog open={true} onClose={handleClose}>
              <DialogContent>
                <ReviewForm
                  selectedMovie={selectedMovie}
                  onClose={handleClose}
                  onSubmitSuccess={handleSuccess}
                />
              </DialogContent>
            </Dialog>
          ) : (
            <ReviewForm
              selectedMovie={selectedMovie}
              onClose={handleClose}
              onSubmitSuccess={handleSuccess}
            />
          )}
        </Box>
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </StyledTableContainer>
  );
};

export default MoviesTable;
