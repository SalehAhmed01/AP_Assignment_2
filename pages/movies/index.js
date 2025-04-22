import MovieCard from "@/pages/components/movie-card";
import fs from "fs";
import path from "path";
import { useState } from "react";

export default function Movies({ movies, genres }) {
  const [selectedGenre, setSelectedGenre] = useState("");

  const filteredMovies = selectedGenre
    ? movies.filter((movie) => movie.genreId === selectedGenre)
    : movies;

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">All Movies</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Filter by Genre</h2>
        <div className="flex flex-wrap gap-2">
          <button
            className={`px-4 py-2 rounded-md mr-2 ${
              selectedGenre === ""
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
            onClick={() => setSelectedGenre("")}
          >
            All
          </button>
          {genres.map((genre) => (
            <button
              key={genre.id}
              className={`px-4 py-2 rounded-md mr-2 ${
                selectedGenre === genre.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
              onClick={() => setSelectedGenre(genre.id)}
            >
              {genre.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </main>
  );
}

export async function getStaticProps() {
  const dataDirectory = path.join(process.cwd(), "data");
  const fileContents = await fs.promises.readFile(
    dataDirectory + "/data.json",
    "utf8"
  );
  const data = JSON.parse(fileContents);

  if (!data || !data.movies || !data.genres) {
    return {
      notFound: true,
    };
  }

  const movies = data.movies.map((movie) => {
    const genre = data.genres.find((genre) => genre.id === movie.genreId);
    return {
      ...movie,
      genre: genre ? genre.name : "Unknown",
    };
  });

  return {
    props: {
      movies,
      genres: data.genres,
    },
    revalidate: 3600, // Revalidate every hour
  };
}
