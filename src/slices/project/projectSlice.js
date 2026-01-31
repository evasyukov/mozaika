import { createSlice } from "@reduxjs/toolkit"
import { projectThunk, deleteProjectThunk } from "./projectThunk"

const initialState = {
  data: null,
  status: "idle",
  error: null,
}

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(projectThunk.pending, (state) => {
        state.status = "loading"
        state.error = null
      })
      .addCase(projectThunk.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.data = action.payload
      })
      .addCase(projectThunk.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload
      })
      .addCase(deleteProjectThunk.pending, (state) => {
        state.status = "loading"
      })
      .addCase(deleteProjectThunk.fulfilled, (state) => {
        state.status = "succeeded"
        state.data = null
      })
      .addCase(deleteProjectThunk.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload
      })
  },
})

export default projectSlice.reducer
