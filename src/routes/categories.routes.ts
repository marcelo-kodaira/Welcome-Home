import { Router } from "express";
import {  createCategoryController, listCategoryController, listCategoryPropertyController} from "../controllers/categories.controller";
import authMiddleware from "../middlewares/auth.middleware";
import isOnlyAdmMiddleware from "../middlewares/isOnlyAdm.middleware";

const categoriesRoutes = Router()

categoriesRoutes.post("",authMiddleware,isOnlyAdmMiddleware,createCategoryController)
categoriesRoutes.get("",listCategoryController)
categoriesRoutes.get("/:id/properties",listCategoryPropertyController)


export default categoriesRoutes