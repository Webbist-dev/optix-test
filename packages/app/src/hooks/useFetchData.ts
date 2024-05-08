import { useState, useEffect, useCallback } from "react";
import { UseFetchDataReturn, DataState } from "../types/types";
import axios from "axios";

const useFetchData = (): UseFetchDataReturn => {
  const [data, setData] = useState<DataState>({
    movies: [],
    companies: [],
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const moviesPromise = axios.get("http://localhost:3000/movies");
      const companiesPromise = axios.get(
        "http://localhost:3000/movieCompanies"
      );

      const [moviesResponse, companiesResponse] = await Promise.all([
        moviesPromise,
        companiesPromise,
      ]);

      setData({
        movies: moviesResponse.data,
        companies: companiesResponse.data,
      });
      setError(null);
    } catch (err: any) {
      console.error("Failed to fetch data:", err);
      setError(err);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { ...data, loading, error, refetch: fetchData };
};

export default useFetchData;
