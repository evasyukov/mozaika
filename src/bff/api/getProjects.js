export async function getProjects() {
  const response = await fetch(`http://localhost:3005/projects`)
  const users = await response.json()
  return users
}
