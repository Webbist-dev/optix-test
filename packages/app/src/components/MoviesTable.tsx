import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

interface MoviesTableProps {
  movies: Movie[];
  companies: Company[];
}

const MoviesTable: React.FC<MoviesTableProps> = ({ movies, companies }) => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const getCompanyName = (companyId: number): string => {
    const company = companies.find((c) => c.id === companyId);
    return company ? company.name : "unknown";
  };

  const calculateAverageReview = (reviews: number[]): string => {
    const average =
      reviews.reduce((acc, curr) => acc + curr, 0) / reviews.length;
    return average.toFixed(1);
  };

  const handleRowSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  return (
    <TableContainer
      component={Paper}
      sx={{ maxWidth: 800, margin: "auto", marginTop: 4 }}
    >
      <Typography variant="h6" sx={{ margin: 2 }}>
        Movie Database
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">Average Review Score</TableCell>
            <TableCell>Company</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {movies.map((movie) => (
            <TableRow
              key={movie.id}
              hover
              selected={selectedMovie?.id === movie.id}
              onClick={() => handleRowSelect(movie)}
              style={{ cursor: "pointer" }}
            >
              <TableCell component="th" scope="row">
                {movie.title}
              </TableCell>
              <TableCell align="right">
                {calculateAverageReview(movie.reviews)}
              </TableCell>
              <TableCell>{getCompanyName(movie.filmCompanyId)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MoviesTable;
