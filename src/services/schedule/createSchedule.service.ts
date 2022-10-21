import { JsonWebTokenError } from "jsonwebtoken"
import AppDataSource from "../../data-source"
import { Properties } from "../../entities/properties.entity"
import { ScheduleUsersProperties } from "../../entities/scheduleUserProperties.entity"
import { User } from "../../entities/user.entity"
import { AppError } from "../../Error/AppError"
import { IScheduleRequest } from "../../interfaces/schedules"
import jwt from 'jsonwebtoken'
import 'dotenv/config'

const createScheduleService = async({date,hour,propertyId,userId}:IScheduleRequest,token:any) =>{
    const scheduleRepository = AppDataSource.getRepository(ScheduleUsersProperties)
    const propertyRepository = AppDataSource.getRepository(Properties)
    const userRepository = AppDataSource.getRepository(User)


    try{
        jwt.verify(token as string, process.env.SECRET_KEY as string, (err:any,decoded:any) =>{
            userId = decoded.sub
        })
    }catch(err){
        if(err instanceof Error){
            throw new AppError("erro",401)
        }
    }

    const property = await propertyRepository.findOneBy({
        id: propertyId
    })

    
    if(!property){
        throw new AppError('Propriedade não encontrado',404)
    }
    
    const user = await userRepository.findOneBy({
        id: userId
    })
    
    const scheduleExits = await scheduleRepository.findOne({
        where:{
            date,
            hour,
            property:{
                id: property.id
            },
            user:{
                id: user!.id
            }
        }
   })

   if(scheduleExits){
    throw new AppError('Horario não disponivel',400)
   }


   const data = new Date(date)
   if(data.getDay() == 6 || data.getDay() == 0){
    throw new AppError("erro")
   }

   const horas = hour.replace(":",".")
   if(+horas < 8.00 || +horas > 18.00){
    throw new AppError("Hora inválida")
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