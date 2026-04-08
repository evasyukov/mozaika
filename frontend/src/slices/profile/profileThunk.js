import { createAsyncThunk } from "@reduxjs/toolkit"

// получение профиля
export const profileIdThunk = createAsyncThunk(
  "profile/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/profile/${id}`)

      if (!res.ok) {
        const errorData = await res.json()
        return rejectWithValue(errorData.error || "Ошибка загрузки профиля")
      }

      const data = await res.json()

      return data
    } catch {
      return rejectWithValue("Сервер недоступен")
    }
  },
)

// обновлениe профиля
export const updateProfileThunk = createAsyncThunk(
  "profile/update",
  async (formData, { getState, rejectWithValue }) => {
    try {
      const state = getState()
      const userId = state.auth.id // берём id текущего пользователя

      const res = await fetch(`/api/profile/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          profile: {
            name: formData.name,
            last_name: formData.lastName,
            direction: formData.direction,
            description: formData.description,
            skills: formData.skills,
            contacts: formData.contacts,
          },
        }),
      })

      console.log(res.ok)

      if (!res.ok) {
        const errorData = await res.json()
        return rejectWithValue(errorData.error || "Ошибка обновления профиля")
      }

      return await res.json()
    } catch {
      return rejectWithValue("Сервер недоступен")
    }
  },
)
