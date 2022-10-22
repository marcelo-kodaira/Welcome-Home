import { JsonWebTokenError } from "jsonwebtoken"
import AppDataSource from "../../data-source"
import { Properties } from "../../entities/properties.entity"
import { ScheduleUsersProperties } from "../../entities/scheduleUserProperties.entity"
import { User } from "../../entities/user.entity"
import { AppError } from "../../Error/AppError"
import { IScheduleRequest } from "../../interfaces/schedules"
import 'dotenv/config'

const createScheduleService = async({date,hour,propertyId,userId}:IScheduleRequest,token:any) =>{
    
    const scheduleRepository = AppDataSource.getRepository(ScheduleUsersProperties)
    const propertyRepository = AppDataSource.getRepository(Properties)
    const userRepository = AppDataSource.getRepository(User)

    userId = token

    const property = await propertyRepository.findOneBy({
        id: propertyId
    })

    if(!property){
        throw new AppError('Propriedade não encontrado',404)
    }

    const user = await userRepository.findOneBy({
        id: userId
    })


    const scheduleExists  = await scheduleRepository.findOne({
        where:{ 
            date,
            hour
        }})

        console.log(scheduleExists)

   if(scheduleExists){
    throw new AppError('User schedule already exists',400)
   }


   const data = new Date(date)
   if(data.getDay() == 6 || data.getDay() == 0){
    throw new AppError("Invalid Date")
   }

   const horas = hour.replace(":",".")
   if(+horas < 8.00 || +horas > 18.00){
    throw new AppError("Invalid hour")
   }

    const schedule = scheduleRepository.create({
        date: date,
        hour: hour,
        property: property,
        user: user!
    })

    await scheduleRepository.save(schedule)
    return schedule
}

export default createScheduleService