import { createAsyncThunk } from "@reduxjs/toolkit"

import { selectUserId } from "../../selectors"
import { fetchProject, removeProject, saveProject } from "../../bff/operations"

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

// добавление проекта и редактирование проекта
export const saveProjectThunk = createAsyncThunk(
  "project/save",
  async ({ data }, { getState, rejectWithValue }) => {
    const authorId = selectUserId(getState())

    const { error, response } = await saveProject({
      data,
      authorId,
    })

    if (error) return rejectWithValue(error)

    return response
  },
)

// удаление проекта
export const deleteProjectThunk = createAsyncThunk(
  "project/delete",
  async ({ projectId, authorId }, { getState, rejectWithValue }) => {
    const authUserId = selectUserId(getState())

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
