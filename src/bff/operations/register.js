import { getUser, addUser } from "../api"

export async function register(regLogin, regPassword) {
  const user = await getUser(regLogin)

  if (user) {
    return {
      error: "Такой логин уже занят",
      response: null,
    }
  }

  const newUser = await addUser(regLogin, regPassword)

  return {
    error: null,
    response: {
      id: newUser.id,
      login: newUser.login,
      roleId: newUser.role_id,
      session: Date.now(),
    },
  }
}
