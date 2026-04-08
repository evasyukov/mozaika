import dotenv from "dotenv"
dotenv.config()

import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import mongoose from "mongoose"

import projectRoutes from "./routes/projectRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"

const app = express()
const port = process.env.PORT || 5007

app.use(express.json())
app.use(cookieParser())

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
)

app.use("/", authRoutes)

app.use("/projects", projectRoutes)

app.use("/profile", userRoutes)

// запуск сервера и подключение к бд
const server = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING)

    console.log("MongoDB connected")
    app.listen(port, () => {
      console.log(`Сервер запущен на порту ${port}`)
    })
  } catch (error) {
    console.error("Startup error:", error)
  }
}

server()
