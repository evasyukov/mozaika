import User from "../models/User.js"
import Project from "../models/Project.js"
import { mapUser } from "../helpers/mapUser.js"

// get user by id
export const getUser = async (req, res) => {
  try {
    const { id } = req.params

    const user = await User.findById(id)

    if (!user) {
      return res.status(404).json({
        error: "Пользователь не найден",
      })
    }

    const projects = await Project.find({ userId: id }).select(
      "name title skills",
    )

    const response = {
      ...mapUser(user),
      projects: projects.map((project) => ({
        id: project._id.toString(),
        name: project.name,
        title: project.title,
        skills: project.skills,
      })),
    }

    res.status(200).json(response)
  } catch (error) {
    console.error("Ошибка при получении пользователя:", error)
    res.status(500).json({
      error: "Ошибка получения пользователя",
    })
  }
}

// get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.aggregate([
      {
        $match: {
          _id: { $ne: req.user._id }, // исключаем админа
        },
      },
      {
        $lookup: {
          from: "projects",
          localField: "_id",
          foreignField: "userId",
          as: "projects",
        },
      },
      {
        $addFields: {
          projectsCount: { $size: "$projects" },
        },
      },
    ])

    const response = users.map((user) => ({
      id: user._id.toString(),
      login: user.login,
      registeredAt: user.registered_at
        ? new Date(user.registered_at).toISOString().split("T")[0]
        : null,
      projectsCount: user.projectsCount || 0,
    }))

    res.status(200).json(response)
  } catch (error) {
    console.error("Ошибка при получении пользователей:", error)
    res.status(500).json({
      error: "Ошибка получения пользователей",
    })
  }
}

// update user
export const updateUser = async (req, res) => {
  try {
    const userId = req.user._id
    const updates = req.body

    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).json({ error: "Пользователь не найден" })
    }

    if (updates.profile && typeof updates.profile === "object") {
      const allowedFields = [
        "name",
        "last_name",
        "direction",
        "description",
        "skills",
        "contacts",
      ]

      for (const key of allowedFields) {
        if (key in updates.profile) {
          user.profile[key] = updates.profile[key]
        }
      }
    }

    await user.save()

    res.status(200).json(mapUser(user))
  } catch (error) {
    console.error("Ошибка при обновлении профиля:", error)
    res.status(500).json({ error: "Ошибка обновления профиля" })
  }
}

// delete user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findById(id)

    if (!user) {
      return res.status(404).json({
        error: "Пользователь не найден",
      })
    }

    // удаляем все проекты пользователя
    await Project.deleteMany({ userId: id })
    await User.findByIdAndDelete(id)

    res.status(200).json({
      message: "Пользователь и его проекты удалены",
      id,
    })
  } catch (error) {
    console.error("Ошибка при удалении пользователя:", error)
    res.status(500).json({
      error: "Ошибка удаления пользователя",
    })
  }
}
