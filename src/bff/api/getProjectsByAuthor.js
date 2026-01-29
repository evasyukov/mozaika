export async function getProjectsByAuthor(authorId) {
  const response = await fetch(
    `http://localhost:3005/projects?author_id=${authorId}`,
  )
  const users = await response.json()
  console.log(users)

  return users
}
