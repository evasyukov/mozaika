import { getUserById, getProjectsByAuthor } from "../api"

export async function profile(id) {
  const user = await getUserById(id)

  if (!user) {
    return { error: "Пользователь не найден", response: null }
  }

  const projects = await getProjectsByAuthor(id)

  const profileData = {
    ...user,
    profile: {
      name: user.profile.name,
      lastName: user.profile.last_name,
      about: user.profile.about,
      description: user.profile.description,
      contacts: user.profile.contacts,
      skills: user.profile.skills,
    },
    projects: projects.map((project) => ({
      id: project.id,
      name: project.name,
      title: project.title,
      skills: project.skills,
    })),
  }

  return { error: null, response: profileData }
}
