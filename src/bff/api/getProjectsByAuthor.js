export async function getProjectsByAuthor(userId) {
  const response = await fetch(
    `http://localhost:3005/projects?userId=${userId}`,
  )
  const users = await response.json()
  return users
}
