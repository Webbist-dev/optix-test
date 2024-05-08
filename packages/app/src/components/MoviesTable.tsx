import React from "react";
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
} from "@mui/material";
import { Movie, MoviesTableProps } from "../types/types";

const MoviesTable: React.FC<MoviesTableProps> = ({
  movies,
  companies,
  sortOrder,
  selectedHeader,
  selectedMovie,
  onSortChange,
  onOpen,
}) => {
  const getCompanyName = (companyId: number): string => {
    const company = companies.find((c) => c.id === companyId);
    return company ? company.name : "unknown";
  };

  movies.forEach((movie: Movie) => {
    const total = movie.reviews.reduce((acc, review) => acc + review, 0);
    movie.averageReviewScore =
      Math.round((total / movie.reviews.length) * 10) / 10;
  });

  return (
    <TableContainer sx={{ margin: "auto", marginTop: 4 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Movie Title</TableCell>
            <TableCell>
              <TableSortLabel
                active={selectedHeader === "averageReviewScore"}
                direction={
                  selectedHeader === "averageReviewScore" ? sortOrder : "asc"
                }
                onClick={() => onSortChange("averageReviewScore")}
              >
                Reviews
              </TableSortLabel>
            </TableCell>
            <TableCell>Company that produced the film</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {movies.map((movie) => (
            <TableRow
              key={movie.id}
              hover
              selected={selectedMovie?.id === movie.id}
              onClick={() => onOpen(movie)}
            >
              <TableCell component="th" scope="row">
                {movie.title}
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 0.5,
                    gap: 1,
                  }}
                >
                  <Typography sx={{ fontWeight: 600 }}>
                    {movie.averageReviewScore}
                  </Typography>
                </Box>
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
