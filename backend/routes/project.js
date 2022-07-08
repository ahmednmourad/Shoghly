import { Router } from "express"

import isAuth from "../middlewares/isAuth.js"
import createProject from "../controllers/project/create.js"
import editProject from "../controllers/Project/update.js"
import deleteProject from "../controllers/Project/delete.js"
import getProject from "../controllers/Project/get.js"
import getProjects from "../controllers/Project/list.js"

const router = Router()

router
  .post("/workers/projects", isAuth, createProject)
  .get("/workers/projects/:projectId", isAuth, getProject)
  .put("/workers/projects/:projectId", isAuth, editProject)
  .delete("/workers/projects/:projectId", isAuth, deleteProject)
  .get("/workers/:workerId/projects", isAuth, getProjects)

export default router
