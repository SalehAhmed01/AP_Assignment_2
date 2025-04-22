import { notFound } from "next/navigation";
import MovieCard from "@/pages/components/movie-card";
import fs from "fs";
import path from "path";

export default function GenreMoviesPage({ genre, movies }) {
  if (!genre) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">{movies.genre} Movies</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        {movies.length} movies found
      </p>

      {movies.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <p>No movies found in this genre.</p>
      )}
    </main>
  );
}

export async function getServerSideProps({ params }) {
  const dataDirectory = path.join(process.cwd(), "data");
  const fileContents = await fs.promises.readFile(
    dataDirectory + "/data.json",
    "utf8"
  );
  const data = JSON.parse(fileContents);

  const genre = data.genres.find((g) => g.id === params.id);

  if (!genre) {
    return {
      notFound: true,
    };
  }

  const movies = data.movies
    .filter((movie) => movie.genreId === params.id)
    .map((movie) => {
      return {
        ...movie,
        genre: genre ? genre.name : "Unknown",
      };
    });

  return {
    props: {
      genre,
      movies,
    },
  };
}
