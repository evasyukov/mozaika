export async function getUserById(id) {
  const response = await fetch(`http://localhost:3005/users?id=${id}`)
  const users = await response.json()
  return users[0] 
}
