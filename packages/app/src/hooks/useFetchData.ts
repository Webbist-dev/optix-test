import { useState, useEffect } from "react";
import axios from "axios";

const useFetchData = (): UseFetchDataReturn => {
  const [data, setData] = useState<DataState>({
    movies: {
      data: [],
      meta: { page: 1, pageSize: 10, count: 0, totalPages: 0 },
    },
    companies: [],
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = import.meta.env.VITE_API_ENDPOINT || "";
      try {
        const moviesPromise = axios.get(`${apiUrl}/movies`);
        const companiesPromise = axios.get(`${apiUrl}/movieCompanies`);

        const [moviesResponse, companiesResponse] = await Promise.all([
          moviesPromise,
          companiesPromise,
        ]);
        setData({
          movies: moviesResponse.data,
          companies: companiesResponse.data,
        });
        setError(null);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError("Failed to fetch data");
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return { ...data, loading, error };
};

export default useFetchData;
