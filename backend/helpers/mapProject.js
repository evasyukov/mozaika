export function mapProject(project) {
  const user = project.userId

  return {
    id: project._id.toString(),
    name: project.name,
    title: project.title,
    description: project.description,
    skills: project.skills,
    author: {
      id: user?._id,
      name: user?.profile?.name || "",
      lastName: user?.profile?.last_name || "",
    },
    createdAt: project.created_at.toISOString().split("T")[0],
  }
}
