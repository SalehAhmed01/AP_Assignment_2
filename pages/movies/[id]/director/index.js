import Link from "next/link";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";

export default function DirectorPage({ movie, director, directorMovies }) {
  if (!director) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{director.name}</h1>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Biography</h2>
            <p className="text-gray-600 dark:text-gray-300">
              {director.biography}
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Movies</h2>
            <ul className="space-y-2">
              {directorMovies.map((dirMovie) => (
                <li key={dirMovie.id}>
                  <Link
                    href={`/movies/${dirMovie.id}`}
                    className={`text-blue-600 hover:underline ${
                      dirMovie.id === movie.id ? "font-bold" : ""
                    }`}
                  >
                    {dirMovie.title} ({dirMovie.releaseYear})
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
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

  if (!director) {
    return {
      notFound: true,
    };
  }

  const directorMovies = data.movies.filter(
    (m) => m.directorId === director.id
  );

  return {
    props: {
      movie,
      director,
      directorMovies,
    },
    revalidate: 3600,
  };
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
    fallback: "blocking",
  };
}
