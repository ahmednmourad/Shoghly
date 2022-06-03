import { Router } from "express"
import isAuth from "../middleware/isAuth.js"
import uploadMiddleware from "../middleware/upload.js"
import uploadController from "../controllers/upload.js"

const router = Router()

router.post("/upload", isAuth, uploadMiddleware, uploadController)

export default router
