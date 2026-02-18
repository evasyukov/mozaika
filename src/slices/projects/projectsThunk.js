import { createAsyncThunk } from "@reduxjs/toolkit"
import { fetchProjects } from "../../bff/operations"

export const projectsThunk = createAsyncThunk(
  "projects/fetchAll",
  async (search, { rejectWithValue }) => {
    const { error, response } = await fetchProjects(search)

    if (error) {
      return rejectWithValue(error)
    }

    return response
  },
)

// export const projectsThunk = createAsyncThunk(
//   "projects/fetchProjects",
//   async (search = "") => {
//     const response = await api.get(`/projects?search=${search}`)
//     return response.data
//   }
// )
