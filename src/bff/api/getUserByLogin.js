export async function getUserByLogin(login) {
  const response = await fetch(`http://localhost:3005/users?login=${login}`)
  const users = await response.json()
  return users[0]
}
