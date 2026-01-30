export async function addProject(projectData) {
  const response = await fetch("http://localhost:3005/projects", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(projectData),
  })
  return response.json()
}
