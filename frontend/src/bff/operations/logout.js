export async function logoutServer() {
  try {
    const res = await fetch("/api/logout", {
      method: "POST",
      credentials: "include",
    })
    if (!res.ok) throw new Error("Ошибка выхода")
    return { error: null }
  } catch (err) {
    return { error: err.message || "Ошибка сети" }
  }
}