import fs from "fs";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function MovieDetails({ movie, director, genre }) {
  if (!movie) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2 py-1 text-xs rounded-full border border-gray-300 text-gray-700 dark:text-gray-300">
                  {movie.releaseYear}
                </span>
                <span className="px-2 py-1 text-xs rounded-full bg-yellow-500 text-white">
                  {movie.rating} ★
                </span>
                <span className="px-2 py-1 text-xs rounded-full bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                  {genre?.name || "Unknown Genre"}
                </span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-600 dark:text-gray-300">
              {movie.description}
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Director</h2>
            <Link
              href={`/movies/${movie.id}/director`}
              className="text-blue-600 hover:underline"
            >
              {director?.name || "Unknown Director"}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export async function getStaticPaths() {
  const dataDirectory = path.join(process.cwd(), "data");
  const fileContents = await fs.promises.readFile(
    dataDirectory + "/data.json",
    "utf8"
  );
  const data = JSON.parse(fileContents);

  const paths = data.movies.map((movie) => ({
    params: { id: movie.id },
  }));

  return {
    paths,
    fallback: "blocking", // generate pages on demand
  };
}

export async function getStaticProps({ params }) {
  const dataDirectory = path.join(process.cwd(), "data");
  const fileContents = await fs.promises.readFile(
    dataDirectory + "/data.json",
    "utf8"
  );
  const data = JSON.parse(fileContents);

  const movie = data.movies.find((m) => m.id === params.id);

  if (!movie) {
    return {
      notFound: true,
    };
  }

  const director = data.directors.find((d) => d.id === movie.directorId);
  const genre = data.genres.find((g) => g.id === movie.genreId);

  return {
    props: {
      movie,
      director,
      genre,
    },
  };
}
