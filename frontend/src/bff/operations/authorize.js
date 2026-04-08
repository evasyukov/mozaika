export async function authorize(login, password) {
  try {
    const response = await fetch("/api/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ login, password }),
    })

    const data = await response.json()

    if (!response.ok) {
      return { error: data.error || "Ошибка авторизации", response: null }
    }

    return {
      error: null,
      response: {
        id: data.id,
        login: data.login,
        roleId: data.role,
        profile: data.profile,
        session: Date.now(),
      },
    }
  } catch (err) {
    console.error("Ошибка сети при авторизации:", err)
    return { error: "Ошибка сети", response: null }
  }
}
