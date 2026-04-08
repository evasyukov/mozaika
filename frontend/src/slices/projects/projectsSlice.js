import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {
  handlePending,
  handleRejected,
  handleFulfilledArray,
} from "../handlers"

export const projectsThunk = createAsyncThunk(
  "projects/fetchAll",
  async (search = "", { rejectWithValue }) => {
    try {
      const query = search ? `?search=${encodeURIComponent(search)}` : ""
      const res = await fetch(`/api/projects${query}`, {
        credentials: "include",
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        return rejectWithValue(data.error || "Ошибка получения проектов")
      }

      const projects = await res.json()

      // трансформируем данные для фронтенда
      const projectsData = projects.map((project) => ({
        id: project.id,
        name: project.name,
        title: project.title,
        skills: project.skills,
        authorName:
          (project.author?.name || "") + " " + (project.author?.lastName || ""),
        createdAt: project.createdAt,
      }))

      return projectsData
    } catch {
      return rejectWithValue("Ошибка соединения с сервером")
    }
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
