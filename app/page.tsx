'use client'
import { Movie } from "@/types/api";
import Link from "next/link"
import { useRouter, usePathname, useSearchParams } from 'next/navigation';




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

      <div className="flex flex-wrap justify-center">
        {pageNumber > 0 && <Link href={constructRoute(searchParams.get('search') ?? undefined, pageNumber - 1)}>Previous</Link>}
        <p className="p-4">Page {pageNumber + 1} of {totalPages}</p>
        {pageNumber < totalPages - 1 && <Link href={constructRoute(searchParams.get('search') ?? undefined, pageNumber + 1)}>Next</Link>}
      </div>

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
