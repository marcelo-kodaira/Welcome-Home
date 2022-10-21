import { Request,Response } from "express";
import { IScheduleRequest } from "../interfaces/schedules";
import createScheduleService from "../services/schedule/createSchedule.service";
import listScheduleService from "../services/schedule/listSchedules.service";

const createScheduleController = async (req: Request, res: Response)=>{
   const data:IScheduleRequest = req.body
   const token = req.headers.authorization?.split(" ")[1]
   const schedule = await createScheduleService(data,token)
   return res.status(201).json({message: schedule})
}

const listScheduleController = async(req:Request, res:Response) =>{
   const {id} = req.params
   const list = await listScheduleService(id)
   return res.status(200).json({schedules: [list]})
}

export {createScheduleController,listScheduleController}