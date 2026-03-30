import User from "../models/User.js"
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

    res.status(200).json(mapUser(user))
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
    const users = await User.find().lean()

    res.status(200).json(users.map(mapUser))
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
      Object.keys(updates.profile).forEach((key) => {
        if (
          [
            "name",
            "last_name",
            "direction",
            "description",
            "skills",
            "contacts",
          ].includes(key)
        ) {
          user.profile[key] = updates.profile[key]
        }
      })
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

    await User.findByIdAndDelete(id)

    res.status(200).json({
      message: "Пользователь удалён",
    })
  } catch (error) {
    console.error("Ошибка при удалении пользователя:", error)
    res.status(500).json({
      error: "Ошибка удаления пользователя",
    })
  }
}
