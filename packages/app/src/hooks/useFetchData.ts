import { useState, useEffect } from "react";
import axios from "axios";

const useFetchData = ({
  page,
  pageSize,
  sortBy,
  sortOrder,
}: PaginationParams): UseFetchDataReturn => {
  const [data, setData] = useState<DataState>({
    movies: {
      data: [],
      meta: { page, pageSize, count: 0, totalPages: 0 },
    },
    companies: [],
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = import.meta.env.VITE_API_ENDPOINT || "";
      try {
        const moviesUrl = `${apiUrl}/movies?page=${page}&pageSize=${pageSize}&sortBy=${sortBy}&sortOrder=${sortOrder}`;
        const moviesPromise = axios.get(moviesUrl);
        const companiesPromise = axios.get(`${apiUrl}/movieCompanies`);

        const [moviesResponse, companiesResponse] = await Promise.all([
          moviesPromise,
          companiesPromise,
        ]);

        setData((prevData) => ({
          ...prevData,
          movies: {
            data: moviesResponse.data.data,
            meta: moviesResponse.data.meta,
          },
          companies: companiesResponse.data,
        }));
        setError(null);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError("Failed to fetch data");
      }
      setLoading(false);
    };

    fetchData();
  }, [page, pageSize, sortBy, sortOrder]);

  return { ...data, loading, error };
};

export default useFetchData;
