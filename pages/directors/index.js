import Link from "next/link";
import useSWR from "swr";

// Fetcher function for SWR
const fetcher = async () => {
  const response = await fetch("/api/directors");
  if (!response.ok) {
    throw new Error("Failed to fetch directors");
  }
  return response.json();
};

export default function DirectorsPage() {
  const {
    data: directors,
    error,
    isLoading,
  } = useSWR("/api/directors", fetcher);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Directors</h1>

      {isLoading && (
        <div className="flex justify-center items-center h-full">
          <div className="loader"></div>
        </div>
      )}

      {error && (
        <div className="text-red-500">
          Error loading directors. Please try again later.
        </div>
      )}

      {directors && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {directors.map((director) => (
            <div
              key={director.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 h-full"
            >
              <h2 className="text-xl font-bold mb-3">{director.name}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {director.biography}
              </p>
              <h3 className="font-semibold mb-2">Movies:</h3>
              <ul className="list-disc list-inside">
                {director.movies?.map((movie) => (
                  <li key={movie.id}>
                    <Link
                      href={`/movies/${movie.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      {movie.title} ({movie.releaseYear})
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
