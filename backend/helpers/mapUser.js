export function mapUser(user) {
  return {
    id: user._id.toString(),
    login: user.login,
    role: user.role,
    registedAt: user.registered_at.toISOString().split("T")[0],
    profile: {
      name: user.profile?.name || "",
      last_name: user.profile?.last_name || "",
      direction: user.profile?.direction || "",
      description: user.profile?.description || "",
      skills: user.profile?.skills || [],
      contacts: user.profile?.contacts || [],
    },
  }
}
