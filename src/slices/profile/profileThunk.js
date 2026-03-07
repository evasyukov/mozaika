import { createAsyncThunk } from "@reduxjs/toolkit"

import { profile, updateProfile } from "../../bff/operations"

export const profileIdThunk = createAsyncThunk(
  "profile/fetchById",
  async (id, { rejectWithValue }) => {
    const { error, response } = await profile(id)

    if (error) {
      return rejectWithValue(error)
    }

    return response
  },
)

// thunk для обновления профиля
export const updateProfileThunk = createAsyncThunk(
  "profile/update",
  async ({ id, formData }, { rejectWithValue }) => {
    const { error, response } = await updateProfile({ id, formData })
    if (error) {
      return rejectWithValue(error)
    }
    return response
  },
)
