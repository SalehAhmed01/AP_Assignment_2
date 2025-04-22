import fs from "fs";
import path from "path";
import Link from "next/link";

export default function GenresPage({ genres }) {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Browse by Genre</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {genres.map((genre) => (
          <Link key={genre.id} href={`/genres/${genre.id}`}>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer h-full p-6">
              <h2 className="text-xl font-bold mb-2">{genre.name}</h2>
              <p className="text-gray-600 dark:text-gray-300">
                {genre.count} movies
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}

export async function getServerSideProps() {
  const dataDirectory = path.join(process.cwd(), "data");
  const fileContents = await fs.promises.readFile(
    dataDirectory + "/data.json",
    "utf8"
  );
  const data = JSON.parse(fileContents);

  if (!data || !data.genres) {
    return {
      notFound: true,
    };
  }

  const genresWithCount = data.genres.map((genre) => {
    const count = data.movies.filter(
      (movie) => movie.genreId === genre.id
    ).length;
    return { ...genre, count };
  });

  return {
    props: {
      genres: genresWithCount,
    },
  };
}
