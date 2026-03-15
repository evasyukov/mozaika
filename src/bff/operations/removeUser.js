import { deleteUser, deleteProject, getProjectsByAuthor } from "../api"

export async function removeUserWithProjects(userId) {
  try {
    const projects = await getProjectsByAuthor(userId)
    await Promise.all(projects.map((project) => deleteProject(project.id)))

    await deleteUser(userId)

    return { error: null, response: userId }
  } catch (err) {
    return {
      error: `Ошибка удаления пользователя: ${err}`,
      response: null,
    }
  }
}
