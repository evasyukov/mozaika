export async function updateProject({ ...updateData }) {
  const loadedPost = await fetch(
    `http://localhost:3005/projects/${updateData.projectId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        name: updateData.name,
        title: updateData.title,
        description: updateData.description,
        skills: updateData.skills,
      }),
    },
  )
  return await loadedPost.json()
}
