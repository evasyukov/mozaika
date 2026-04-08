import { createAsyncThunk } from "@reduxjs/toolkit"

// получение проекта
export const projectThunk = createAsyncThunk(
  "project/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/projects/${id}`, {
        credentials: "include",
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        return rejectWithValue(data.error || "Проект не найден")
      }

      const project = await res.json()

      // преобразуем структуру
      const projectData = {
        project: {
          id: project.id,
          name: project.name,
          title: project.title,
          description: project.description,
          skills: project.skills,
        },
        author: project.author,
      }

      return projectData
    } catch {
      return rejectWithValue("Ошибка соединения с сервером")
    }
  },
)

// добавление проекта и редактирование проекта
export const saveProjectThunk = createAsyncThunk(
  "project/save",
  async ({ data }, { rejectWithValue }) => {
    try {
      // определяем метод, редактируем проект или создаем новый
      const url = data.projectId
        ? `/api/projects/${data.projectId}`
        : "/api/projects"

      const method = data.projectId ? "PATCH" : "POST"

      const res = await fetch(url, {
        method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          title: data.title,
          description: data.description,
          skills: data.skills,
        }),
      })

      const result = await res.json()

      if (!res.ok) {
        return rejectWithValue(result.error || "Ошибка сохранения проекта")
      }

      return result
    } catch {
      return rejectWithValue("Ошибка соединения с сервером")
    }
  },
)

// удаление проекта
export const deleteProjectThunk = createAsyncThunk(
  "project/delete",
  async (projectId, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/projects/${projectId}`, {
        method: "DELETE",
        credentials: "include",
      })

      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        return rejectWithValue(data.error || "Ошибка удаления проекта")
      }

      return projectId
    } catch {
      return rejectWithValue("Ошибка соединения с сервером")
    }
  },
)
