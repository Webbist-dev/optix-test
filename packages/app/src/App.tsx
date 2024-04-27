import React from "react";
import { Container, Stack, Box, Typography, Paper } from "@mui/material";
import MoviesTable from "./components/MoviesTable";
import Pagination from "./components/Pagination";

import useFetchData from "./hooks/useFetchData";

const App: React.FC = () => {
  const { movies, companies, loading, error } = useFetchData();
  return (
    <div>
      {loading && <p>Loading...</p>}
      {movies.data.length > 0 && companies.length > 0 && (
        <Container maxWidth="lg" component={Paper}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 2,
              marginTop: 2,
            }}
          >
            <Typography variant="h6">Movie Database</Typography>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              Total Movies: {movies.meta.count}
            </Typography>
          </Box>
          <Stack alignItems={"center"} spacing={2} paddingBottom={2}>
            <MoviesTable movies={movies.data} companies={companies} />
            <Pagination
              page={movies.meta.page}
              totalPages={movies.meta.totalPages}
            />
          </Stack>
        </Container>
      )}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default App;
