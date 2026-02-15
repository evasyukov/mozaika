import { createSlice } from "@reduxjs/toolkit"
import { projectsThunk } from "./projectsThunk"

const initialState = {
  data: [],
  status: "idle",
  error: null,
}

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    resetProjectsData: (state) => {
      state.data = null
      state.status = "idle"
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(projectsThunk.pending, (state) => {
        state.status = "loading"
        state.error = null
      })
      .addCase(projectsThunk.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.data = action.payload
      })
      .addCase(projectsThunk.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload
      })
  },
})

export const { resetProjectData } = projectsSlice.actions
export default projectsSlice.reducer
