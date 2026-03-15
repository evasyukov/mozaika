import { getUsers, getProjects } from "../api"

export async function fetchUsers() {
  const [users, projects] = await Promise.all([getUsers(), getProjects()])

  if (!users) {
    return {
      error: "Ошибка запроса. Пользователей не найдено",
      response: null,
    }
  }

  const projectsByUser = projects.reduce((acc, project) => {
    acc[project.userId] = (acc[project.userId] || 0) + 1
    return acc
  }, {})

  const usersData = users.map((user) => ({
    id: user.id,
    login: user.login,
    registeredAt: user.registed_at.split(" ")[0],
    projectsCount: projectsByUser[user.id] || 0,
  }))

  return {
    error: null,
    response: usersData,
  }
}
