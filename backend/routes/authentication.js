import { Router } from "express"
import signup from "../controllers/Authentication/signup.js"
import signin from "../controllers/Authentication/signin.js"

const router = Router()

router.post("/signup", signup)

router.post("/signin", signin)

export default router
