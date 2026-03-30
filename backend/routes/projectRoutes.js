import express from "express"

import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js"
import { authenticate } from "../middlewares/authenticate.js"

const router = express.Router()

router.get("/", getProjects)
router.get("/:id", getProjectById)

router.post("/", authenticate, createProject)

router.patch("/:id", authenticate, updateProject)

router.delete("/:id", authenticate, deleteProject)

export default router
