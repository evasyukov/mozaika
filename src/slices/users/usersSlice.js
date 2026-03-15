import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { fetchUsers, removeUserWithProjects } from "../../bff/operations"
import {
  handlePending,
  handleRejected,
  handleFulfilledArray,
} from "../handlers"

// получение списка пользователей
export const usersThunk = createAsyncThunk(
  "users/fetchAll",
  async (_, { rejectWithValue }) => {
    const { error, response } = await fetchUsers()
    if (error) return rejectWithValue(error)
    return response
  },
)

// удаление пользователя
export const deleteUserThunk = createAsyncThunk(
  "users/delete",
  async (userId, { rejectWithValue }) => {
    const { error, response } = await removeUserWithProjects(userId)

    if (error) return rejectWithValue(error)

    return response
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
