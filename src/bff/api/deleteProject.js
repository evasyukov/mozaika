export function deleteProject(projectId) {
  // console.log(projectId)

  return fetch(`http://localhost:3005/projects/${projectId}`, {
    method: "DELETE",
  })
}
