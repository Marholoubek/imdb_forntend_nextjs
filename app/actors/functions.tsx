import { NameBasics } from "@/types/api";

interface NameBasicsApi {
  primaryName: string;
  birthYear: number;
  deathYear?: number;
}

const API_BASE_URL = "http://localhost:8081/api/v1/actors/";

export async function deleteActor(id: string): Promise<NameBasics> {
  const res = await fetch(`${API_BASE_URL}${id}`, { method: "DELETE" });
  const data = await res.json();
  return data;
}

export async function updateActor(id: string, nameBasics: NameBasicsApi): Promise<NameBasics> {
  const res = await fetch(`${API_BASE_URL}${id}`, {
    method: "PUT",
    body: JSON.stringify(nameBasics),
  });
  const data = await res.json();
  return data;
}
