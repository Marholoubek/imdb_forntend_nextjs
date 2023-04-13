import { Actor } from '../../../models/actor';


async function getActor(actorId: string) {
    const res = await fetch(`http://localhost:8081/api/v1/actors/${actorId}`, { next: { revalidate: 10 } })
    const data = await res.json()
    return data
}

export default async function ActorPage({ params }: any) {
    const actor: Actor = await getActor(params.id)
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1 className="text-6xl">Name: {actor.primaryName}</h1>
            <p className="text-2xl">Birth Year: {actor.birthYear}</p>
            <p className="text-2xl">Death Year: {actor.deathYear}</p>


        </main>
    )
}