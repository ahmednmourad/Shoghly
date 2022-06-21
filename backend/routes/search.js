import { Router } from "express"
import isAuth from "../middlewares/isAuth.js"
import autoComplete from "../controllers/Search/autoComplete.js"
import searchResults from "../controllers/Search/searchResults.js"
const router = Router()

router.get("/autocomplete", isAuth, autoComplete)
router.get("/search", isAuth, searchResults)

export default router
