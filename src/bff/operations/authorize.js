import { getUserByLogin } from "../api"

export async function authorize(authLogin, authPassword) {
  const user = await getUserByLogin(authLogin)

  if (!user) {
    return { error: "Пользователь не найден", response: null }
  }

  if (authPassword !== user.password) {
    return { error: "Пароль неверный", response: null }
  }

  const userData = {
    id: user.id,
    login: user.login,
    roleId: user.role_id,
    session: Date.now(),
  }

  return { error: null, response: userData }
}
