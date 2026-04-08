import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {
  handlePending,
  handleRejected,
  handleFulfilledArray,
} from "../handlers"

// получение списка пользователей
export const usersThunk = createAsyncThunk(
  "users/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/profile", {
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      })

      if (!res.ok) {
        const errorData = await res.json()
        return rejectWithValue(
          errorData.error || "Ошибка загрузки пользователей",
        )
      }

      return await res.json()
    } catch {
      return rejectWithValue("Сервер недоступен")
    }
  },
)

// удаление пользователя
export const deleteUserThunk = createAsyncThunk(
  "users/delete",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/profile/${userId}`, {
        method: "DELETE",
      })

      if (!res.ok) {
        const errorData = await res.json()
        return rejectWithValue(
          errorData.error || "Ошибка удаления пользователя",
        )
      }

      const data = await res.json()
      return data.id
    } catch {
      return rejectWithValue("Сервер недоступен")
    }
  },
)

const initialState = {
  data: [],
  status: "idle",
  error: null,
}

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    resetUsersData: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // получение списка пользователей
      .addCase(usersThunk.pending, handlePending)
      .addCase(usersThunk.fulfilled, handleFulfilledArray)
      .addCase(usersThunk.rejected, handleRejected)

      // удаление пользователя
      .addCase(deleteUserThunk.pending, handlePending)
      .addCase(deleteUserThunk.fulfilled, (state, action) => {
        state.status = "succeeded"

        state.data = state.data.filter((user) => user.id !== action.payload)
      })
      .addCase(deleteUserThunk.rejected, handleRejected)
  },
})

export const { resetUsersData } = usersSlice.actions
export default usersSlice.reducer
