import { createAsyncThunk } from "@reduxjs/toolkit"
import { fetchProjects } from "../../bff/operations"

export const projectsThunk = createAsyncThunk(
  "projects/fetchAll",
  async (_, { rejectWithValue }) => {
    const { error, response } = await fetchProjects()

    if (error) {
      return rejectWithValue(error)
    }

    return response
  },
)
