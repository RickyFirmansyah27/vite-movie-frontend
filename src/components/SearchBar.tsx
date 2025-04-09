import React from 'react';
import { Search, Filter } from 'lucide-react';
import type { SearchFilters } from '../types';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: SearchFilters) => void;
}

export function SearchBar({ onSearch, onFilterChange }: SearchBarProps) {
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  const [filters, setFilters] = React.useState<SearchFilters>({});

  const genres = [
    'Action',
    'Comedy',
    'Drama',
    'Horror',
    'Romance',
    'Sci-Fi',
    'Thriller',
  ];

  const handleFilterChange = (newFilters: SearchFilters) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
  };

  const handleSearchSubmit = () => {
    onFilterChange(filters);
    setIsFilterOpen(false);
  };

  const handleReset = () => {
    setFilters({}); // Reset local state
    onFilterChange({}); // Send empty filters to parent
    setIsFilterOpen(false); // Close filter dropdown
  };

  return (
    <div className="relative w-full max-w-2xl">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <input
          type="search"
          placeholder="Search movies..."
          className="w-full rounded-full bg-white py-3 pl-12 pr-20 shadow-lg outline-none ring-blue-500 focus:ring-2"
          onChange={(e) => onSearch(e.target.value)}
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="rounded-full p-1 hover:bg-gray-100"
            aria-label="Toggle filters"
            aria-expanded={isFilterOpen}
          >
            <Filter className="h-5 w-5 text-gray-600" />
          </button>
          <button
            onClick={handleReset}
            className="rounded-full p-1 hover:bg-gray-100 text-gray-600 hover:text-gray-800"
            aria-label="Reset filters"
          >
            Reset
          </button>
        </div>
      </div>

      {isFilterOpen && (
        <div 
          className="absolute mt-2 w-full rounded-lg bg-white p-4 shadow-lg"
          role="dialog"
          aria-label="Filter options"
        >
          <div className="mb-4">
            <h3 className="mb-2 font-medium text-gray-900">Genre</h3>
            <div className="flex flex-wrap gap-2">
              {genres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => handleFilterChange({ genre })}
                  className={`rounded-full px-3 py-1 text-sm transition-colors ${
                    filters.genre === genre
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  aria-pressed={filters.genre === genre}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <h3 className="mb-2 font-medium text-gray-900">Movie Name</h3>
            <input
              type="text"
              placeholder="Enter movie name"
              className="w-full rounded-md border border-gray-300 p-2 outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => handleFilterChange({ name: e.target.value })}
              aria-label="Movie name filter"
            />
          </div>

          <div className="mb-4">
            <h3 className="mb-2 font-medium text-gray-900">Language</h3>
            <input
              type="text"
              placeholder="Enter language"
              className="w-full rounded-md border border-gray-300 p-2 outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => handleFilterChange({ language: e.target.value })}
              aria-label="Language filter"
            />
          </div>

          <div className="mb-4">
            <h3 className="mb-2 font-medium text-gray-900">User Rating</h3>
            <input
              type="number"
              min="0"
              max="10"
              step="0.1"
              placeholder="0-10"
              className="w-full rounded-md border border-gray-300 p-2 outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => 
                handleFilterChange({ userRating: parseFloat(e.target.value) })
              }
              aria-label="User rating filter"
            />
          </div>

          <button
            onClick={handleSearchSubmit}
            className="w-full rounded-md bg-blue-500 py-2 text-white hover:bg-blue-600 transition-colors"
          >
            Search
          </button>
        </div>
      )}
    </div>
  );
}