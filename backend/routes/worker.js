import { Router } from "express"

import getWorker from "../controllers/worker/get.js"
import listWorkers from "../controllers/worker/list.js"

const router = Router()

router
  .get("/workers/:workerId", getWorker)
  .get("/workers", listWorkers)

export default router
