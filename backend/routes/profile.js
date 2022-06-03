import { Router } from "express"
import getProfile from "../controllers/Profile/getProfile.js"
import updateProfile from "../controllers/Profile/updateProfile.js"
import isAuth from "../middleware/isAuth.js"
const router = Router()

router.get("/profile/:userId", getProfile)
router.put("/profile", isAuth, updateProfile)

export default router
