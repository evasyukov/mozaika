import { addProject, updateProject } from "../api"

export async function saveProject({ data }) {
  const project = data.projectId
    ? await updateProject({
        ...data,
      })
    : await addProject({
        ...data,
      })

  if (!project) {
    return {
      error: data.projectId
        ? "Не удалось обновить проект"
        : "Не удалось создать проект",
      response: null,
    }
  }

  return {
    error: null,
    response: project,
  }
}
