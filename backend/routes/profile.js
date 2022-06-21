import { Router } from "express"
import changeProfilePicture from "../controllers/Profile/changeProfilePicture.js"
import getProfile from "../controllers/Profile/getProfile.js"
import updateProfile from "../controllers/Profile/updateProfile.js"
import isAuth from "../middlewares/isAuth.js"
const router = Router()

router.get("/profile/:userId", getProfile)
router.put("/profile", isAuth, updateProfile)
router.post("/profile/changePicture", isAuth, changeProfilePicture)

export default router
