import bcrypt from "bcrypt"
import User from "../models/User.js"
import { generateToken } from "../middlewares/token.js"

export const register = async (req, res) => {
  try {
    // получаем данные, декомпозируем объект profile
    const { login, password, profile } = req.body
    const profileData = profile || {}
    const name = profileData.name
    const last_name = profileData.last_name
    const direction = profileData.direction

    // проверяем поля
    if (!login || !password || !name || !last_name || !direction) {
      return res.status(400).json({
        error: "Не все обязательные поля заполнены",
      })
    }

    // проверка логина на уникальность
    const userChecked = await User.findOne({ login })
    if (userChecked) {
      return res.status(400).json({
        error: "Пользователь уже существует",
      })
    }

    // хешируем пароль
    const hash = await bcrypt.hash(password, 10)

    // создаем пользователя
    const user = await User.create({
      login,
      password: hash,
      profile: {
        name,
        last_name,
        direction,
        description: profileData.description || "",
        skills: profileData.skills || [],
        contacts: profileData.contacts || [],
      },
    })

    // генерируем токен
    const token = generateToken({
      id: user._id,
      role: user.role,
    })

    // сохраняем токен в куках и отправляем юзера
    res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      })
      .status(201)
      .json({
        user: {
          id: user._id,
          login: user.login,
          role: user.role,
          profile: user.profile,
          registered_at: user.registered_at,
        },
      })
  } catch (error) {
    console.error("Ошибка при регистрации:", error)
    res.status(500).json({
      error: "Ошибка регистрации",
    })
  }
}

export const login = async (req, res) => {
  try {
    const { login, password } = req.body

    if (!login || !password) {
      return res.status(400).json({ error: "Логин и пароль обязательны" })
    }

    // получаем пользователя
    const user = await User.findOne({ login })
    if (!user) {
      return res.status(400).json({ error: "Пользователь не найден" })
    }

    // проверка пароля
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ error: "Неверный логин или пароль" })
    }

    // генерируем токен
    const token = generateToken({ id: user._id, role: user.role })

    // сохраняем токен в куках и отправляем юзера
    res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        user: {
          id: user._id,
          login: user.login,
          role: user.role,
          profile: user.profile,
          registered_at: user.registered_at,
        },
      })
  } catch (error) {
    console.error("Ошибка при логине:", error)
    res.status(500).json({ error: "Ошибка авторизации" })
  }
}

export const logout = (req, res) => {
  res
    .clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    })
    .status(200)
    .json({ message: "Вы успешно вышли из системы" })
}
