import { createSlice } from "@reduxjs/toolkit"
import {
  projectThunk,
  saveProjectThunk,
  deleteProjectThunk,
} from "./projectThunk"
import {
  handlePending,
  handleRejected,
  handleFulfilledObject,
} from "../handlers"

const initialState = {
  data: null,
  status: "idle",
  error: null,
}

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    resetProjectData: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(projectThunk.pending, handlePending)
      .addCase(projectThunk.fulfilled, handleFulfilledObject)
      .addCase(projectThunk.rejected, handleRejected)

      .addCase(saveProjectThunk.pending, handlePending)
      .addCase(saveProjectThunk.fulfilled, (state) => {
        state.status = "succeeded"
      })
      .addCase(saveProjectThunk.rejected, handleRejected)

      .addCase(deleteProjectThunk.pending, handlePending)
      .addCase(deleteProjectThunk.fulfilled, (state) => {
        state.status = "succeeded"
        state.data = null
      })
      .addCase(deleteProjectThunk.rejected, handleRejected)
  },
})

export const { resetProjectData } = projectSlice.actions
export default projectSlice.reducer
