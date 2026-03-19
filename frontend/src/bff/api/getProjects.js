export async function getProjects(search = "") {
  const response = await fetch(
    `http://localhost:3005/projects?_expand=user&name_like=${search}`,
  )
  const projects = await response.json()
  return projects
}
