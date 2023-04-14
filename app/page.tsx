'use client'
import { Movie, TitleBasicsApi } from "@/types/api";
import Link from "next/link"
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from "react";
import { createMovie } from "./functions";




export const dynamic = 'auto', dynamicParams = true, revalidate = 0, fetchCache = 'auto', runtime = 'nodejs', preferredRegion = 'auto'



async function getMovies(search?: string, page?: number) {



  const api = constructApiUrl(search, page)

  const res = await fetch(api, { next: { revalidate: 10 } })
  const data = await res.json()
  return data
}

function constructApiUrl(search?: string, page?: number) {
  const params = new URLSearchParams()
  if (search) {
    params.append('search', search)
  }
  if (page) {
    params.append('page', page.toString())
  }
  const api = 'http://localhost:8081/api/v1/titles' + (params.toString() ? '?' + params.toString() : '')
  return api
}

function constructRoute(search?: string, page?: number) {
  const params = new URLSearchParams()
  if (search) {
    params.append('search', search)
  }
  if (page) {
    params.append('page', page.toString())
  }
  const api = '/' + (params.toString() ? '?' + params.toString() : '')
  return api
}

export default async function Home() {
  const [newMovie, setNewMovie] = useState<TitleBasicsApi>({
    titleType: "",
    primaryTitle: "",
    originalTitle: "",
    startYear: 0,
    endYear: 0,
    runtimeMinutes: 0,
    isAdult: false,
  });
  const router = useRouter();

  const searchParams = useSearchParams();

  const search = searchParams.get('search') || undefined;
  const page = searchParams.get('page') ? parseInt(searchParams.get('page')!) : undefined;

  const moviesPage = await getMovies(search, page);
  const movies = moviesPage.content;
  const pageNumber = moviesPage.pageable.pageNumber;
  const totalPages = moviesPage.totalPages;

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const search = e.currentTarget.search.value;
    router.push(constructRoute(search, 0));
  }



  function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setNewMovie((prev) => {
      return { ...prev, [name]: value };
    });
  }

  async function updateMovieOnSubmit(event: FormEvent) {
    event.preventDefault();
    const res = await createMovie(newMovie);
    console.log(res);
  }

  return (
    <main className="flex flex-wrap justify-center flex-col items-center min-h-screen py-2">
      <h1 className="text-6xl">Movies</h1>
      <div className="search">
        <form onSubmit={handleSearch}>
          <input type="text" name="search" />
          <button type="submit">Search</button>
        </form>
        {search && <p>Search results for "{search}"</p>}
        {search && <p>Showing {movies.length} of {moviesPage.totalElements} results</p>}
        {search && <Link href={constructRoute()}>Clear search</Link>}

      </div>
      <div className="flex flex-wrap justify-center">
        {movies.map((movie: Movie) => (
          <MovieCard key={movie.tconst} movie={movie} />
        ))}
      </div>

      <div className="flex flex-wrap justify-center space-x-4 items-center">
        {pageNumber > 0 && (
          <Link href={constructRoute(searchParams.get("search") ?? undefined, pageNumber - 1)} passHref>
            <span className="bg-blue-600 text-white font-semibold px-4 py-2 rounded hover:bg-blue-700 cursor-pointer">
              Previous
            </span>
          </Link>
        )}
        <p className="text-lg font-medium">
          Page {pageNumber + 1} of {totalPages}
        </p>
        {pageNumber < totalPages - 1 && (
          <Link href={constructRoute(searchParams.get("search") ?? undefined, pageNumber + 1)} passHref>
            <span className="bg-blue-600 text-white font-semibold px-4 py-2 rounded hover:bg-blue-700 cursor-pointer">
              Next
            </span>
          </Link>
        )}
      </div>



      <form onSubmit={updateMovieOnSubmit} className="w-full max-w-lg mx-auto">
        <div className="flex flex-col space-y-4">

          <h3 className="text-2xl font-semibold mb-4">Add Movie</h3>
          <label htmlFor="primaryTitle" className="text-lg font-medium">Primary Title</label>
          <input id="primaryTitle" type="text" value={newMovie.titleType} onChange={handleOnChange} className="border border-gray-300 p-2 rounded" />

          <label htmlFor="originalTitle" className="text-lg font-medium">Original Title</label>
          <input id="originalTitle" type="text" value={newMovie.originalTitle} onChange={handleOnChange} className="border border-gray-300 p-2 rounded" />

          <label htmlFor="startYear" className="text-lg font-medium">Start Year</label>
          <input id="startYear" type="text" value={newMovie.startYear} onChange={handleOnChange} className="border border-gray-300 p-2 rounded" />

          <label htmlFor="endYear" className="text-lg font-medium">End Year</label>
          <input id="endYear" type="text" value={newMovie.endYear} onChange={handleOnChange} className="border border-gray-300 p-2 rounded" />

          <label htmlFor="runtimeMinutes" className="text-lg font-medium">Runtime Minutes</label>
          <input id="runtimeMinutes" type="text" value={newMovie.runtimeMinutes} onChange={handleOnChange} className="border border-gray-300 p-2 rounded" />

          <div className="flex items-center space-x-2">
            <label htmlFor="isAdult" className="text-lg font-medium">Is Adult</label>
            <input
              id="isAdult"
              type="checkbox"
              checked={newMovie.isAdult}
              onChange={(event) =>
                setNewMovie((prev) => {
                  return { ...prev, isAdult: event.target.checked };
                })
              }
              className="form-checkbox h-5 w-5"
            />
          </div>

          <button type="submit" className="bg-blue-600 text-white font-semibold px-4 py-2 rounded hover:bg-blue-700">Add Movie</button>
        </div>
      </form>

    </main>
  )
}

function MovieCard({ movie }: { movie: Movie }) {
  return (
    <Link href={`/${movie.tconst}`}>
      <div className="flex flex-col items-center justify-between p-4 m-3 rounded-lg bg-white shadow-md hover:shadow-lg transition-all">
        <h3 className="text-2xl font-bold mb-2">{movie.primaryTitle}</h3>
        <p className="text-xl mb-4">{movie.startYear}</p>
        <p className="text-md mb-2">{movie.genres?.map(genre => genre.name).join(", ")}</p>
      </div>
    </Link>
  );
}
