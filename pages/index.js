import { useRouter } from "next/navigation";
import fs from "fs";
import path from "path";
import MovieCard from "@/pages/components/movie-card";

export default function Home({ trendingMovies }) {
  const router = useRouter();

  return (
    <main className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Trending Movies</h1>
          <button
            onClick={() => router.push("/genres")}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Browse Genres
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>
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

  if (!data) {
    return {
      notFound: true,
    };
  }

  // Sort movies by rating and get the top 3
  const trendingMovies = [...data.movies]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3)
    .map((movie) => {
      const genre = data.genres.find((genre) => genre.id === movie.genreId);
      return {
        ...movie,
        genre: genre ? genre.name : "Unknown",
      };
    });

  return {
    props: {
      trendingMovies,
    },
    revalidate: 3600, // Revalidate every hour
  };
}
