import { Router } from "express"
import autoComplete from "../controllers/search/autoComplete.js"
import search from "../controllers/Search/search.js"
const router = Router()

router.get("/autocomplete", autoComplete)
router.get("/search", search)

export default router
