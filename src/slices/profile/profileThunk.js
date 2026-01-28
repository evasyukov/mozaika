import { createAsyncThunk } from "@reduxjs/toolkit"

import { profile } from "../../bff/operations"

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
