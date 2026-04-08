import express from "express"

import { register, login, logout } from "../controllers/authController.js"
import { authenticate } from "../middlewares/authenticate.js"
import { mapUser } from "../helpers/mapUser.js"

const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.post("/logout", authenticate, logout)

router.get("/me", authenticate, (req, res) => {
  res.json(mapUser(req.user))
})

export default router
