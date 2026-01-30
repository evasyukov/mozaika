import { addProject } from "../api"

export async function createProject(projectData, authorId) {

  console.log(projectData);
  
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
