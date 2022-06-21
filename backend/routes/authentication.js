import { Router } from "express"

import signin from "../controllers/Authentication/signin.js"

const router = Router()

router.post("/signin", signin)

export default router
