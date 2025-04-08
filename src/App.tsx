import React, { useEffect } from 'react';
import { get, pickBy } from 'lodash';
import { MovieCard } from './components/MovieCard';
import { MovieDetail } from './components/MovieDetail';
import { SearchBar } from './components/SearchBar';
import type { Movie, SearchFilters } from './types';
import { useGetMovies } from './services/movie-service';

function App() {
  const [selectedMovie, setSelectedMovie] = React.useState<Movie | null>(null);
  const [searchMovie, setSearchMovie] = React.useState('');
  const [filters, setFilters] = React.useState<SearchFilters>({
    genre: '',
  });

  const [page, setPage] = React.useState(1);
  const [size, setSize] = React.useState(5);

  const params = {
    size: size,
    page: page,
    name: searchMovie,
    ...filters,
  };

  const { data: movieResponse, isLoading, isError } = useGetMovies(pickBy(params));
  const movies = get(movieResponse, 'data.data.movies', []);
  const totalData = get(movieResponse, 'data.data.total_data', 0);
  const totalPages = Math.ceil(totalData / size);

  useEffect(() => {
    setPage(1);
  }, [size]);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSize(parseInt(event.target.value, 10));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">Error loading movies. Please try again later.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-3xl font-bold text-gray-900">Movie App</h1>
            <SearchBar onSearch={setSearchMovie} onFilterChange={setFilters} />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8" role="main" aria-label="Movie grid">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} onClick={setSelectedMovie} />
          ))}
        </div>

        <div className="flex justify-between mt-6">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={handlePreviousPage}
            disabled={page === 1}
          >
            Previous
          </button>
          <div className="flex items-center gap-2">
            <span>Items per page:</span>
            <select
              className="px-2 py-1 border rounded"
              value={size}
              onChange={handleSizeChange}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </select>
          </div>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={handleNextPage}
            disabled={page === totalPages} // Disable Next button if we're on the last page
          >
            Next
          </button>
        </div>
      </main>

      {selectedMovie && (
        <MovieDetail movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </div>
  );
}

export default App;
