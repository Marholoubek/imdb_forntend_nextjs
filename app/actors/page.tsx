'use client'
import { Actor } from "@/types/api";
import Link from "next/link"
import { useRouter, usePathname, useSearchParams } from 'next/navigation';




export const dynamic = 'auto', dynamicParams = true, revalidate = 0, fetchCache = 'auto', runtime = 'nodejs', preferredRegion = 'auto'



async function getActors(search?: string, page?: number) {



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
  const api = 'http://localhost:8081/api/v1/actors' + (params.toString() ? '?' + params.toString() : '')
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

export default async function Actors() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const search = searchParams.get('search') || undefined;
  const page = searchParams.get('page') ? parseInt(searchParams.get('page')!) : undefined;

  const actorsPage = await getActors(search, page);
  const actors = actorsPage.content;
  const pageNumber = actorsPage.pageable.pageNumber;
  const totalPages = actorsPage.totalPages;

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const search = e.currentTarget.search.value;
    router.push(constructRoute(search, 0));
  }


  return (
    <main className="flex flex-wrap justify-center flex-col items-center min-h-screen py-2">
      <h1 className="text-6xl">actors</h1>
      <div className="search">
        <form onSubmit={handleSearch}>
          <input type="text" name="search" />
          <button type="submit">Search</button>
        </form>
        {search && <p>Search results for "{search}"</p>}
        {search && <p>Showing {actors.length} of {actorsPage.totalElements} results</p>}
        {search && <Link href={constructRoute()}>Clear search</Link>}

      </div>
      <div className="flex flex-wrap justify-center">
        {actors.map((actor: Actor) => (
          <ActorCard key={actor.id} actor={actor} />
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

function ActorCard({ actor }: { actor: Actor }) {
  return (
    <Link href={`/actors/${actor.id}`}>
      <div className="flex flex-col items-center justify-between p-4 m-3 rounded-lg bg-white shadow-md hover:shadow-lg transition-all">
        <h3 className="text-2xl font-bold mb-2">{actor.primaryName}</h3>
        <p className="text-xl mb-4">{actor.birthYear}</p>
        <p className="text-md mb-2">{actor.primaryProfession?.map(profesion => profesion.name).join(", ")}</p>
      </div>
    </Link>
  );
}
