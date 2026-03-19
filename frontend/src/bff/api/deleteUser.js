export function deleteUser(userId) {
  return fetch(`http://localhost:3005/users/${userId}`, {
    method: "DELETE",
  })
}
