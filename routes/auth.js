import { Router } from "express"
import { login, getMe } from "../controllers/auth.js"
import { checkAuth } from "../utils/chechAuth.js"

const router = new Router()

//Login
router.post('/login', login)

//Get me
router.get('/me',checkAuth, getMe)

export default router