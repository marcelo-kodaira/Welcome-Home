import { Router } from "express";
import { createScheduleController, listScheduleController } from "../controllers/schedules.controller";
import authMiddleware from "../middlewares/auth.middleware";
import isOnlyAdmMiddleware from "../middlewares/isOnlyAdm.middleware";

const scheduleRouter = Router()

scheduleRouter.post("",authMiddleware,createScheduleController)
scheduleRouter.get("/properties/:id",authMiddleware,isOnlyAdmMiddleware,listScheduleController)

export default scheduleRouter