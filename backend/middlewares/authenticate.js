import User from "../models/User.js"
import { verifyToken } from "./token.js"

export const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.token

    // проверяем токен
    if (!token) {
      console.log(`токена нет`);
      
      return res.status(401).json({ error: "Токен отсутствует" })
    }
    const tokenData = verifyToken(token)

    // ищем пользователя
    const user = await User.findById(tokenData.id)
    if (!user) {
      return res
        .status(401)
        .json({ error: "Авторизованный пользователь не найден" })
    }

    req.user = user
    next()
  } catch (error) {
    console.error("Ошибка аутентификации:", error)
    return res.status(401).json({ error: "Неверный токен" })
  }
}
