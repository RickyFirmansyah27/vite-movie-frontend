import { useQuery } from "@tanstack/react-query";
import { apiGet } from "./axios-client";

const DEFAULT_QUERY_OPTIONS = {
  retry: 1,
  refetchOnWindowFocus: false,
};

const basePath = "/api/movies";

export const useGetMovies = (query = {}) => {
  return useQuery({
    ...DEFAULT_QUERY_OPTIONS,
    queryKey: ["get movies", query],
    queryFn: async () => {
      return await apiGet(`${basePath}`, query);
    },
  });
};

