export async function getProjectById(id) {
  const response = await fetch(`http://localhost:3005/projects?id=${id}`)
  const users = await response.json()
  return users[0] 
}
