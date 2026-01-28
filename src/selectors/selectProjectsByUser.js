export const selectProjectsByUser = (state, userId) =>
  state.projects.data.filter((proj) => proj.authorId === userId)
