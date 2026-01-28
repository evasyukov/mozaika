import { generateDate } from "../utils"

export function addUser(login, password) {
  return fetch("http://localhost:3005/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      login,
      password,
      profile_visibility: true,
      registed_at: generateDate(),
      role_id: 1,
    }),
  }).then((createdUser) => createdUser.json())
}
