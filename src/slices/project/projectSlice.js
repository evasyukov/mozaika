import { createSlice } from "@reduxjs/toolkit"
import {
  projectThunk,
  saveProjectThunk,
  deleteProjectThunk,
} from "./projectThunk"

const initialState = {
  data: null,
  status: "idle",
  error: null,
}

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    resetProjectData: (state) => {
      state.data = null
      state.status = "idle"
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // получаем проект
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

      // создание и обновление проекта
      .addCase(saveProjectThunk.pending, (state) => {
        state.status = "loading"
        state.error = null
      })
      .addCase(saveProjectThunk.fulfilled, (state) => {
        state.status = "succeeded"
      })
      .addCase(saveProjectThunk.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload
      })

      // удаление проекта
      .addCase(deleteProjectThunk.pending, (state) => {
        state.status = "loading"
        state.error = null
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

export const { resetProjectData } = projectSlice.actions
export default projectSlice.reducer
