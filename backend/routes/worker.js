import { Router } from "express"

import isAuth from "../middlewares/isAuth.js"
import getWorker from "../controllers/worker/get.js"
import listWorkers from "../controllers/worker/list.js"

const router = Router()

router
  .get("/workers/:workerId", getWorker)
  .get("/workers", isAuth, listWorkers) // TODO: Do we need workers to be public?

export default router
