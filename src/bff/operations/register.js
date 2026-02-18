import { getUserByLogin, addUser } from "../api"

export async function register({ data }) {
  const user = await getUserByLogin(data.login)

  if (user) {
    return {
      error: "Такой логин уже занят",
      response: null,
    }
  }

  const newUser = await addUser(data)

  return {
    error: null,
    response: {
      id: newUser.id,
      login: newUser.login,
      profileVisibility: newUser.profile_visibility,
      roleId: newUser.role_id,
      session: Date.now(),
    },
  }
}
