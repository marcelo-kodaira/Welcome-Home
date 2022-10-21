import { Router } from "express";
import loginController from "../controllers/login.controller";


const loginRoutes = Router()

loginRoutes.post("",loginController)

export default loginRoutes 