import React from "react";
import MoviesTable from "./components/MoviesTable";
import useFetchData from "./hooks/useFetchData";

const App: React.FC = () => {
  const { movies, companies, loading, error } = useFetchData();
  return (
    <div>
      {loading && <p>Loading...</p>}
      {movies.length > 0 && companies.length > 0 && (
        <MoviesTable movies={movies} companies={companies} />
      )}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default App;
