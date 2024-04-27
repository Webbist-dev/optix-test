import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Rating,
  Box,
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

  const handleRowSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  return (
    <TableContainer sx={{ margin: "auto", marginTop: 4 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 600 }}>Title</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Company</TableCell>
            <TableCell align="right" sx={{ fontWeight: 600 }}>
              Average Review
            </TableCell>
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
              <TableCell>{getCompanyName(movie.filmCompanyId)}</TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "right",
                  }}
                >
                  <Rating
                    defaultValue={0}
                    precision={0.1}
                    value={movie.averageReviewScore}
                    max={10}
                    readOnly
                  />
                  <Box sx={{ width: 40 }}>
                    <Typography
                      sx={{ marginLeft: 1, fontWeight: 600 }}
                      align="right"
                    >
                      {movie.averageReviewScore}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MoviesTable;
