import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const dataDirectory = path.join(process.cwd(), "data");
    const fileContents = await fs.promises.readFile(
      dataDirectory + "/data.json",
      "utf8"
    );
    const data = JSON.parse(fileContents);

    const directorsWithMovies = data.directors.map((director) => {
      const movies = data.movies.filter(
        (movie) => movie.directorId === director.id
      );
      return {
        ...director,
        movies,
      };
    });

    return res.status(200).json(directorsWithMovies);
  } catch (error) {
    return res.status(500).json({ error: "Failed to load directors" });
  }
}
