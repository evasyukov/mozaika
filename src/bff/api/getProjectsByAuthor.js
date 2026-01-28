export async function getProjectsByAuthor(authorId) {
  const response = await fetch(
    `http://localhost:3005/projects?authorId=${authorId}`,
  )
  const users = await response.json()
  return users
}
