import { createAsyncThunk } from "@reduxjs/toolkit"

// авторизация
export const authorizeUser = createAsyncThunk(
  "auth/authorizeUser",
  async ({ login, password }, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        return rejectWithValue(data.error || "Ошибка авторизации")
      }

      // формируем данные
      const userData = {
        id: data.id,
        login: data.login,
        roleId: data.role,
        profile: data.profile,
        session: Date.now(),
      }

      sessionStorage.setItem("userData", JSON.stringify(userData))

      return userData
    } catch (error) {
      console.error("Ошибка при авторизации:", error)
      return rejectWithValue("Ошибка")
    }
  },
)

// регистрация
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (data, { rejectWithValue }) => {
    try {
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
        return rejectWithValue(result.error || "Ошибка регистрации")
      }

      // формируем данные
      const userData = {
        id: result.id,
        login: result.login,
        roleId: result.role,
        profile: result.profile,
        session: Date.now(),
      }

      sessionStorage.setItem("userData", JSON.stringify(userData))

      return userData
    } catch (err) {
      console.error("Ошибка сети при регистрации:", err)
      return rejectWithValue("Ошибка сети")
    }
  },
)

// выход
export const logoutUser = createAsyncThunk(
  "auth/logoutBackend",
  async (_, { rejectWithValue }) => {
    try {
      // очищаем локальные данные
      sessionStorage.removeItem("userData")

      const res = await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        return rejectWithValue(data.error || "Ошибка выхода")
      }

      return null
    } catch (err) {
      console.error("Ошибка сети при выходе:", err)
      return rejectWithValue("Ошибка сети")
    }
  },
)

// проверка токена
export const fetchMe = createAsyncThunk(
  "auth/fetchMe",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/me", {
        credentials: "include", // важно, чтобы куки сессии передавались
      })

      if (!res.ok) {
        return rejectWithValue("Unauthorized")
      }

      const data = await res.json()

      // формируем данные
      const userData = {
        id: data.id,
        login: data.login,
        roleId: data.role,
        profile: data.profile,
        session: Date.now(),
      }

      sessionStorage.setItem("userData", JSON.stringify(userData))

      return userData
    } catch (err) {
      console.error("Ошибка сети при получении текущего пользователя:", err)
      return rejectWithValue("Ошибка сети")
    }
  },
)
