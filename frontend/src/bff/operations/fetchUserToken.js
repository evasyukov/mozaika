export const fetchUserToken = async () => {
  const res = await fetch("api/me", {
    credentials: "include",
  })

  if (!res.ok) {
    return { error: "Unauthorized" }
  }

  const data = await res.json()
  return { response: data }
}
