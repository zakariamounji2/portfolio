import { Project } from "@/types";

export async function getProjects(): Promise<Project[]> {
  const res = await fetch("http://localhost:8080/api/projects", {
    headers: { "Content-Type": "application/json" },
    cache: "no-store"
  });

  if (!res.ok) {
    throw new Error(`GET /api/projects failed: ${res.status}`);
  }

  return (await res.json()) as Project[];
}

