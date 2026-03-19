import { deleteProject } from "../api"

export async function removeProject(projectId, authUserId, projectAuthorId) {
  if (authUserId !== projectAuthorId) {
    return { error: "Нет прав на удаление проекта", response: null }
  }

  await deleteProject(projectId)

  return { error: null, response: projectId }
}
