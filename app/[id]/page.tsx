import { MoveDetailsView, TitleBasicsApi } from "@/types/api";
import { ChangeEvent, FormEvent, useState } from "react";
import { updateMovie } from "../functions";

async function getMovie(movieId: string) {
  const res = await fetch(`http://localhost:8081/api/v1/movies/${movieId}`, {
    next: { revalidate: 10 },
  });
  const data = await res.json();
  return data;
}

export default async function Movie({ params }: any) {
  const movieId = params.id;
  const movie: MoveDetailsView = await getMovie(movieId);

  const [newMovie, setNewMovie] = useState<TitleBasicsApi>({
    titleType: movie.titleType || "",
    primaryTitle: movie.primaryTitle || "",
    originalTitle: movie.originalTitle || "",
    startYear: movie.startYear || 0,
    endYear: movie.endYear || 0,
    runtimeMinutes: movie.runtimeMinutes || 0,
    isAdult: movie.isAdult || false,
  });

  function handeOnChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setNewMovie((prev) => {
      return { ...prev, [name]: value };
    });
  }

  async function updateMovieOnSubmit(event: FormEvent) {
    event.preventDefault();
    const res = await updateMovie(movieId, newMovie);
    console.log(res);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-6xl">Primary Title: {movie.primaryTitle}</h1>
      <p className="text-2xl">Original Title: {movie.originalTitle}</p>
      <p className="text-2xl">Start Year: {movie.startYear}</p>
      <p className="text-2xl">End Year: {movie.endYear}</p>
      <p className="text-2xl">Runtime Minutes: {movie.runtimeMinutes}</p>
      <p className="text-2xl">Genres: {movie.genres}</p>
      <p className="text-2xl">Writers: {movie.writers}</p>
      <p className="text-2xl">Directors: {movie.directors}</p>

      <div>
        <form className="d-flex flex-column" onSubmit={updateMovieOnSubmit}>
          <label>Primary Title</label>
          <input type="text" value={newMovie.titleType} onChange={handeOnChange} />
          <label>Original Title</label>
          <input type="text" value={newMovie.originalTitle} onChange={handeOnChange} />
          <label>Start Year</label>
          <input type="text" value={newMovie.startYear} onChange={handeOnChange} />
          <label>End Year</label>
          <input type="text" value={newMovie.endYear} onChange={handeOnChange} />
          <label>Runtime Minutes</label>
          <input type="text" value={newMovie.runtimeMinutes} onChange={handeOnChange} />
          <label>Is Adult</label>
          <input
            type="checkbox"
            checked={newMovie.isAdult}
            onChange={(event) =>
              setNewMovie((prev) => {
                return { ...prev, isAdult: event.target.checked };
              })
            }
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </main>
  );
}
