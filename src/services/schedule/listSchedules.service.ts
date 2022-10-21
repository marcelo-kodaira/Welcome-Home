import AppDataSource from "../../data-source"
import { Properties } from "../../entities/properties.entity"
import { ScheduleUsersProperties } from "../../entities/scheduleUserProperties.entity"
import { AppError } from "../../Error/AppError"

const listScheduleService = async(id:string) =>{

    const propertyRepository = AppDataSource.getRepository(Properties)
    const property = await propertyRepository.findOneBy({
        id
    })

    if(!property){
        throw new AppError('property not found',404)
    }

    const scheduleRepository = AppDataSource.getRepository(ScheduleUsersProperties)
    const schedule = await scheduleRepository.findOne({
        relations:{
                user: true
        },
        where:{
            property:{
                id : property!.id
            }
        }
    })

    return schedule
}
export default listScheduleService