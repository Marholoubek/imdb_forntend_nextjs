import { MoveDetailsView } from "@/types/api"

async function getMovie(movieId: string) {
    const res = await fetch(`http://localhost:8081/api/v1/movies/${movieId}`, { next: { revalidate: 10 } })
    const data = await res.json()
    return data
}

export default async function Movie({ params }: any) {
    const movie: MoveDetailsView = await getMovie(params.id)
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

        </main>
    )
}