export async function getProjectById(id) {
  const response = await fetch(
    `http://localhost:3005/projects/${id}?_expand=user`,
  )

  if (!response.ok) return null

  return await response.json()
}
