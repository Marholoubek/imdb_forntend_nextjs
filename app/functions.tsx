import { TitleBasics, TitleBasicsApi } from "@/types/api";

const API_BASE_URL = "http://localhost:8081/api/v1/titles/";

export async function createMovie(titleBasics: TitleBasicsApi): Promise<TitleBasics> {
  const res = await fetch(`${API_BASE_URL}`, {
    method: "POST",
    body: JSON.stringify(titleBasics),
  });
  const data = await res.json();
  return data;
}

export async function updateMovie(id: string, titleBasics: TitleBasicsApi): Promise<TitleBasics> {
  const res = await fetch(`${API_BASE_URL}${id}`, {
    method: "PUT",
    body: JSON.stringify(titleBasics),
  });
  const data = await res.json();
  return data;
}
