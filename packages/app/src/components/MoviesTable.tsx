import React from "react";
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
  IconButton,
  TableSortLabel,
} from "@mui/material";
import ReviewsIcon from "@mui/icons-material/Reviews";

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

  return (
    <TableContainer sx={{ margin: "auto", marginTop: 4 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell
              sx={{ fontWeight: 600, width: "30%" }}
              style={{ cursor: "pointer" }}
            >
              <TableSortLabel
                active={selectedHeader === "title"}
                direction={selectedHeader === "title" ? sortOrder : "asc"}
                onClick={() => onSortChange("title")}
              >
                Title
              </TableSortLabel>
            </TableCell>
            <TableCell
              sx={{ fontWeight: 600, width: "30%" }}
              style={{ cursor: "pointer" }}
            >
              <TableSortLabel
                active={selectedHeader === "filmCompanyId"}
                direction={
                  selectedHeader === "filmCompanyId" ? sortOrder : "asc"
                }
                onClick={() => onSortChange("filmCompanyId")}
              >
                Company
              </TableSortLabel>
            </TableCell>
            <TableCell
              sx={{ fontWeight: 600, width: "20%" }}
              style={{ cursor: "pointer" }}
            >
              <TableSortLabel
                active={selectedHeader === "averageReviewScore"}
                direction={
                  selectedHeader === "averageReviewScore" ? sortOrder : "asc"
                }
                onClick={() => onSortChange("averageReviewScore")}
              >
                Audience Score
              </TableSortLabel>
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: 600, width: "10%" }}>
              Add Review
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {movies.map((movie) => (
            <TableRow
              key={movie.id}
              hover
              selected={selectedMovie?.id === movie.id}
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
                    marginBottom: 0.5,
                    gap: 1,
                  }}
                >
                  <Typography sx={{ fontWeight: 600 }}>
                    {movie.averageReviewScore}/10
                  </Typography>
                  <Typography variant="body2">
                    based on {movie.reviews.length}{" "}
                    {`review${movie.reviews.length > 1 ? "s" : ""}`}
                  </Typography>
                </Box>
                <Rating
                  defaultValue={0}
                  precision={0.1}
                  value={movie.averageReviewScore}
                  max={10}
                  readOnly
                />
              </TableCell>
              <TableCell align="right">
                <IconButton onClick={() => onOpen(movie)}>
                  <ReviewsIcon color="primary" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MoviesTable;
