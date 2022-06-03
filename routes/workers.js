import { Router } from "express"
import isAuth from "../middleware/isAuth.js"
import getWorkers from "../controllers/getWorkers.js"

const router = Router()

router.get("/workers", isAuth, getWorkers)

export default router
