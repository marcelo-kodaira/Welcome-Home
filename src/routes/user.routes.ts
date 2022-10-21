import { Router } from "express"
import { createUserController, deleteUserController, listUserController, updateUserController } from "../controllers/user.controller"
import authMiddleware from "../middlewares/auth.middleware";
import isAdmMiddleware from "../middlewares/isAdm.middleware";
import isOnlyAdmMiddleware from "../middlewares/isOnlyAdm.middleware";

const userRoutes = Router()

userRoutes.post("",createUserController)
userRoutes.get("",authMiddleware,isOnlyAdmMiddleware,listUserController)
userRoutes.patch("/:id",authMiddleware,isAdmMiddleware,updateUserController)
userRoutes.delete("/:id",authMiddleware,isOnlyAdmMiddleware,deleteUserController)

export default userRoutes