import { addProject } from "../api"

export async function createProject(projectData, authorId) {
  const project = await addProject({
    ...projectData,
    authorId,
  })

  if (!project) {
    return {
      error: "Не удалось создать проект",
      response: null,
    }
  }

  return {
    error: null,
    response: project,
  }
}
