// import { useSelector } from "react-redux"
import { createAsyncThunk } from "@reduxjs/toolkit"

import { selectUserId } from "../../selectors"
import {
  fetchProject,
  createProject,
  removeProject,
} from "../../bff/operations"

// получение проекта
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

// добавление проекта
export const createProjectThunk = createAsyncThunk(
  "projects/create",
  async (projectData, { rejectWithValue }) => {
    const { error, response } = await createProject(projectData)
    if (error) return rejectWithValue(error)
    return response
  },
)

// удаление проекта
export const deleteProjectThunk = createAsyncThunk(
  "project/delete",
  async ({ projectId, authorId }, { getState, rejectWithValue }) => {
    const authUserId = getState(selectUserId).auth.id

    const { error, response } = await removeProject(
      projectId,
      authUserId,
      authorId,
    )

    if (error) {
      return rejectWithValue(error)
    }

    return response
  },
)
