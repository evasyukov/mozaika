export async function patchProfile({ id, profile }) {
  const loadedProfile = await fetch(`http://localhost:3005/users/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ profile }),
  })

  return await loadedProfile.json()
}
