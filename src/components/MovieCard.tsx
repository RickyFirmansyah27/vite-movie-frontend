import React from 'react';
import { Star } from 'lucide-react';
import type { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
}

export function MovieCard({ movie, onClick }: MovieCardProps) {
  return (
    <div 
      className="group relative overflow-hidden rounded-lg bg-white shadow-lg transition-transform hover:scale-[1.02] cursor-pointer"
      onClick={() => onClick(movie)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick(movie)}
    >
      <div className="aspect-[2/3] overflow-hidden">
        <img
          src={movie?.imgPath}
          alt={`${movie?.name} poster`}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 line-clamp-1">{movie?.name}</h3>
        <div className="mt-1 flex items-center gap-2">
          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
          <span className="text-sm text-gray-600">{movie?.userRating}</span>
        </div>
        <div className="mt-2 flex flex-wrap gap-1">
          {movie?.genre.slice(0, 2).map((genre) => (
            <span
              key={genre}
              className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600"
            >
              {genre}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}