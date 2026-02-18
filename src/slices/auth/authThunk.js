import { createAsyncThunk } from "@reduxjs/toolkit"
import { authorize, register } from "../../bff/operations"

export const authorizeUser = createAsyncThunk(
  "auth/authorizeUser",
  async ({ login, password }, { rejectWithValue }) => {
    const { error, response } = await authorize(login, password)

    if (error) {
      return rejectWithValue(error)
    }

    return response
  },
)

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ data }, { rejectWithValue }) => {
    const { error, response } = await register({ data })

    if (error) {
      return rejectWithValue(error)
    }

    return response
  },
)
