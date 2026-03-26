export function mapProject(project) {
  return {
    id: project._id.toString(),
    name: project.name,
    title: project.title,
    description: project.description,
    skills: project.skills,
    userId: project.userId?.toString(),
    createdAt: project.created_at,
  }
}
