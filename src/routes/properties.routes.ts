import { Router } from "express";
import { createPropertyController, listPropertyController } from "../controllers/properties.controller";
import authMiddleware from "../middlewares/auth.middleware";
import isOnlyAdmMiddleware from "../middlewares/isOnlyAdm.middleware";

const propertiesRoutes = Router()

propertiesRoutes.post("",authMiddleware,isOnlyAdmMiddleware,createPropertyController)
propertiesRoutes.get("",listPropertyController)

export default propertiesRoutes