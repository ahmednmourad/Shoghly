import { Router } from "express"
import signup from "../controllers/Authentication/signup.js"
import signin from "../controllers/Authentication/signin.js"
import forgotPassword from "../controllers/Authentication/forgotPassword.js"
import resetPassword from "../controllers/Authentication/resetPassword.js"

const router = Router()

router.post("/signup", signup)

router.post("/signin", signin)

router.post("/resetPassword/:token", resetPassword)

router.post("/forgotPassword", forgotPassword)

export default router
