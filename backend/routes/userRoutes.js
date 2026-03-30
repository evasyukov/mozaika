import express from "express"

import {
  getUser,
  getUsers,
  deleteUser,
  updateUser,
} from "../controllers/userController.js"
import { authenticate } from "../middlewares/authenticate.js"
import { hasRole } from "../middlewares/hasRole.js"

import { ROLES } from "../constants/roles.js"

const router = express.Router()

router.get("/:id", authenticate, getUser)
router.patch("/:id", authenticate, updateUser)

// admin
router.get("/", hasRole([ROLES.ADMIN]), getUsers)
router.delete("/:id", hasRole([ROLES.ADMIN]), deleteUser)

export default router
