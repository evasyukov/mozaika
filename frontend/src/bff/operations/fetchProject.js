import { getProjectById } from "../api"

export async function fetchProject(id) {
  const project = await getProjectById(id)

  if (!project) {
    return { error: "Такого проекта не существует :(", response: null }
  }

  const projectData = {
    project: {
      id: project.id,
      name: project.name,
      title: project.title,
      description: project.description,
      skills: project.skills,
    },
    author: {
      id: project.user.id,
      name: project.user.profile.name,
      lastName: project.user.profile.last_name,
    },
  }

  return { error: null, response: projectData }
}
