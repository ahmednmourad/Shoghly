import { Router } from "express"
import isAuth from "../middleware/isAuth.js"
import createProject from "../controllers/Project/createProject.js"
import editProject from "../controllers/Project/editProject.js"
import deleteProject from "../controllers/Project/deleteProject.js"
import getProject from "../controllers/Project/getProject.js"
import getProjects from "../controllers/Project/getProjects.js"

const router = Router()

router.post("/workers/projects", isAuth, createProject)
router.get("/workers/projects/:projectId", isAuth, getProject)
router.put("/workers/projects/:projectId", isAuth, editProject)
router.delete("/workers/projects/:projectId", isAuth, deleteProject)
router.get("/workers/:workerId/projects", isAuth, getProjects)

export default router
