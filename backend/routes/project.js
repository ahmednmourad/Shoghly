import { Router } from "express"
import isAuth from "../middlewares/isAuth.js"
import createProject from "../controllers/project/createProject.js"
import editProject from "../controllers/project/editProject.js"
import deleteProject from "../controllers/project/deleteProject.js"
import getProject from "../controllers/project/getProject.js"
import getProjects from "../controllers/project/getProjects.js"

const router = Router()

router.post("/workers/projects", isAuth, createProject)
router.get("/workers/projects/:projectId", isAuth, getProject)
router.put("/workers/projects/:projectId", isAuth, editProject)
router.delete("/workers/projects/:projectId", isAuth, deleteProject)
router.get("/workers/:workerId/projects", isAuth, getProjects)

export default router
