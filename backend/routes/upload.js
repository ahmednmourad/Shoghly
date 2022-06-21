import { Router } from "express"
import isAuth from "../middlewares/isAuth.js"
import uploadMiddleware from "../middlewares/upload.js"
import uploadController from "../controllers/upload.js"

const router = Router()

router.post("/upload", isAuth, uploadMiddleware, uploadController)

export default router
