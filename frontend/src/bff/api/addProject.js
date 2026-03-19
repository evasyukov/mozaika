import { generateDate } from "../utils"

export async function addProject(projectData) {
  const response = await fetch("http://localhost:3005/projects", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: projectData.name,
      title: projectData.title,
      description: projectData.description,
      userId: projectData.authUserId,
      skills: projectData.skills,
      created_at: generateDate(),
    }),
  })
  return response.json()
}
