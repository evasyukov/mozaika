export async function getUsers() {
  const response = await fetch(`http://localhost:3005/users`)
  const users = await response.json()
  return users
}
