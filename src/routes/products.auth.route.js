import express from "express"
import { login } from "../controllers/products.auth.Controllers.js"

const routes = express.Router()

routes.post("/login", login)

export default routes;