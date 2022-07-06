import { Router } from "express"
import isAuth from "../middlewares/isAuth.js"
import autoComplete from "../controllers/search/autoComplete.js"
import search from "../controllers/Search/search.js"
const router = Router()

router.get("/autocomplete", isAuth, autoComplete)
router.get("/search", isAuth, search)

export default router
