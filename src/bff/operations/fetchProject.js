import { getProjectById, getUserById } from "../api"

export async function fetchProject(id) {
  const project = await getProjectById(id)

  if (!project) {
    return { error: "Такого проекта не существует :(", response: null }
  }

  const author = await getUserById(project.author_id)

  const projectData = {
    project: {
      id: project.id,
      name: project.name,
      title: project.title,
      description: project.description,
      skills: project.skills,
    },
    author: {
      id: author.id,
      name: author.profile.name,
      lastName: author.profile.last_name,
    },
  }

  return { error: null, response: projectData }
}
