import { getProjects } from "../api"

export async function fetchProjects() {
  const projects = await getProjects()

  if (!projects || projects.length === 0) {
    return { error: "Ошибка запроса. Проектов не найдено :(", response: null }
  }

  const projectsData = projects.map((project) => ({
    id: project.id,
    name: project.name,
    title: project.title,
    skills: project.skills,
    authorName: project.user?.profile?.name + ' ' + project.user?.profile?.last_name,
    // authorLastName: project.user?.profile?.last_name,
    createdAt: project.created_at,
  }))

  return { error: null, response: projectsData }
}
