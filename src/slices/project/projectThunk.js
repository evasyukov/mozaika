import { createAsyncThunk } from "@reduxjs/toolkit"
import { fetchProject } from "../../bff/operations"

export const projectThunk = createAsyncThunk(
  "project/fetchById",
  async (id, { rejectWithValue }) => {
    const { error, response } = await fetchProject(id)

    if (error) {
      return rejectWithValue(error)
    }

    return response
  },
)
