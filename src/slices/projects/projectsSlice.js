import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { fetchProjects } from "../../bff/operations"
import {
  handlePending,
  handleRejected,
  handleFulfilledArray,
} from "../handlers"

export const projectsThunk = createAsyncThunk(
  "projects/fetchAll",
  async (search, { rejectWithValue }) => {
    const { error, response } = await fetchProjects(search)
    if (error) return rejectWithValue(error)
    return response
  },
)

const initialState = {
  data: [],
  status: "idle",
  error: null,
}

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    resetProjectsData: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(projectsThunk.pending, handlePending)
      .addCase(projectsThunk.fulfilled, handleFulfilledArray)
      .addCase(projectsThunk.rejected, handleRejected)
  },
})

export const { resetProjectsData } = projectsSlice.actions
export default projectsSlice.reducer
