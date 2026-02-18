import { generateDate } from "../utils"

export function addUser(data) {
  return fetch("http://localhost:3005/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      login: data.login,
      password: data.password,
      profile_visibility: true,
      registed_at: generateDate(),
      role_id: 1,

      profile: {
        name: data.name,
        last_name: data.lastName,
        about: data.direction,
        description: "",
        skills: [],
        contacts: [],
      },
    }),
  }).then((createdUser) => createdUser.json())
}
