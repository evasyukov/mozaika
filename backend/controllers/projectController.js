import Project from "../models/Project.js"
import { mapProject } from "../helpers/mapProject.js"

// get all
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find()

    res.json(projects.map(mapProject))
  } catch (error) {
    res.status(500).json({ error: "Ошибка получения проектов" })
  }
}

// get id
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)

    if (!project) {
      return res.status(404).json({ error: "Проект не найден" })
    }

    res.json(mapProject(project))
  } catch (error) {
    res.status(500).json({ error: "Ошибка получения проекта" })
  }
}

// post
export const createProject = async (req, res) => {
  try {
    const { name, title, description, skills, userId } = req.body

    if (!name || !title || !description) {
      return res
        .status(400)
        .json({ error: "Не все обязательные поля заполнены" })
    }

    const project = await Project.create({
      name,
      title,
      description,
      skills,
      userId,
    })

    res.status(201).json(mapProject(project))
  } catch (error) {
    res.status(500).json({ error: "Ошибка создания проекта" })
  }
}

// patch
export const updateProject = async (req, res) => {
  try {
    const updates = req.body

    const project = await Project.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    })

    if (!project) {
      return res.status(404).json({ error: "Проект не найден" })
    }

    res.json(mapProject(project))
  } catch (error) {
    res.status(500).json({ error: "Ошибка обновления проекта" })
  }
}

// delete
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id)

    if (!project) {
      return res.status(404).json({ error: "Проект не найден" })
    }

    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ error: "Ошибка удаления проекта" })
  }
}
