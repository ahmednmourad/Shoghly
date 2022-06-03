import { Router } from "express"
import isAuth from "../middleware/isAuth.js"
import autoComplete from "../controllers/Search/autoComplete.js"
import searchResults from "../controllers/Search/searchResults.js"
const router = Router()

router.get("/search", autoComplete)
router.post("/search", searchResults)

export default router
