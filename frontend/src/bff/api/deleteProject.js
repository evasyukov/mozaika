export function deleteProject(projectId) {
  return fetch(`http://localhost:3005/projects/${projectId}`, {
    method: "DELETE",
  })
}
