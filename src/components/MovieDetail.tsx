import React from 'react';
import type { Movie } from '../types';
import { X } from 'lucide-react';

interface MovieDetailProps {
  movie: Movie;
  onClose: () => void;
}

export function MovieDetail({ movie, onClose }: MovieDetailProps) {
  // Prevent body scroll when modal is open
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
      <div className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={onClose} />
        
        <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:align-middle">
          <div className="absolute right-0 top-0 pr-4 pt-4">
            <button
              type="button"
              className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
              onClick={onClose}
            >
              <span className="sr-only">Close</span>
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <div className="bg-white px-4 pt-5 pb-4 sm:p-6">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 w-full sm:mt-0 sm:text-left">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-semibold leading-6 text-gray-900">
                    {movie.title}
                  </h3>
                  <div className="ml-4 flex flex-shrink-0">
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-sm font-medium text-blue-800">
                      {movie.userRating}/10
                    </span>
                  </div>
                </div>

                <div className="mt-4 aspect-video w-full">
                  <img
                    src={movie.imgPath}
                    className="h-full w-full rounded-lg"
                    title={`${movie.title} trailer`}
                    alt={`${movie.title} trailer`}
                  />
                </div>

                <div className="mt-4">
                  <p className="text-sm text-gray-500">
                    {movie.year} • {movie.duration}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {movie.genre.map((g) => (
                      <span
                        key={g}
                        className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800"
                      >
                        {g}
                      </span>
                    ))}
                  </div>
                  <p className="mt-4 text-sm text-gray-600">{movie.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}