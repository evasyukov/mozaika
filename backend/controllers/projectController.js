import Project from "../models/Project.js"
import { mapProject } from "../helpers/mapProject.js"

// get all
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate("userId")
    res.json(projects.map(mapProject))
  } catch (error) {
    res.status(500).json({ error: "Ошибка получения проектов" })
  }
}

// get id
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate("userId")

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
    const { name, title, description, skills } = req.body

    const userId = req.user._id

    if (!name || !title || !description) {
      return res.status(400).json({
        error: "Не все обязательные поля заполнены",
      })
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

    const project = await Project.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      updates,
      { new: true },
    )

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
    const project = await Project.findById(req.params.id)

    if (!project) {
      return res.status(404).json({ error: "Проект не найден" })
    }

    // проверка владельца TODO: надо ли?
    if (project.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Нет прав на удаление" })
    }

    await project.deleteOne()

    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ error: "Ошибка удаления проекта" })
  }
}
