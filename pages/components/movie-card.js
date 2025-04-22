import Link from "next/link";

export default function MovieCard({ movie }) {
  if (!movie) {
    return null;
  }
  return (
    <Link href={`/movies/${movie.id}`}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer h-full">
        <div className="p-5">
          <h2 className="text-xl font-bold mb-2">{movie.title}</h2>
          <div className="flex items-center gap-2 mt-2 mb-3">
            <span className="px-2 py-1 text-xs rounded-full border border-gray-300 text-gray-700 dark:text-gray-300">
              {movie.releaseYear}
            </span>
            <span className="px-2 py-1 text-xs rounded-full bg-yellow-500 text-white">
              {movie.rating} ★
            </span>
          </div>
          <p className="line-clamp-3 text-gray-600 dark:text-gray-300 mb-4">
            {movie.description}
          </p>
          <div className="mt-auto">
            <span className="px-2 py-1 text-xs rounded-full bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
              {movie.genre}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
