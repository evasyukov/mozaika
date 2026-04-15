import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {
  handlePending,
  handleRejected,
  handleFulfilledArray,
} from "../handlers"

export const projectsThunk = createAsyncThunk(
  "projects/fetchAll",
  async ({ search = "", page = 1 }, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams({
        search,
        page,
        limit: 4,
      }).toString()

      const res = await fetch(`/api/projects?${query}`, {
        credentials: "include",
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        return rejectWithValue(data.error || "Ошибка получения проектов")
      }

      const data = await res.json()

      return {
        projects: data.projects.map((project) => ({
          id: project.id,
          name: project.name,
          title: project.title,
          skills: project.skills,
          authorName:
            (project.author?.name || "") +
            " " +
            (project.author?.lastName || ""),
          createdAt: project.createdAt,
        })),
        lastPage: data.lastPage,
      }
    } catch {
      return rejectWithValue("Ошибка соединения с сервером")
    }
  },
)

const initialState = {
  data: [],
  lastPage: 1,
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
