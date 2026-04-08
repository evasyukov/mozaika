export async function register(data) {
  const res = await fetch("/api/register", {
    method: "POST",
    credentials: "include", 
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  const result = await res.json()

  if (!res.ok) {
    return {
      error: result.error,
      response: null,
    }
  }

  return {
    error: null,
    response: result,
  }
}
