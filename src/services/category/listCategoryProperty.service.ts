import AppDataSource from "../../data-source"
import { Categories } from "../../entities/categories.entity"
import { Properties } from "../../entities/properties.entity"
import { AppError } from "../../Error/AppError"

const listCategoryPropertyService = async(id:string) =>{

    const categoryRepository = AppDataSource.getRepository(Categories)
    
    const category  = await categoryRepository.findOne({
        where:{ 
            id: id
        },
        relations:[
            "properties"
        ]})
        
        if(!category){
            throw new AppError('Categoria inválida',404)
        }
    return category
    
    // const propertiesRepository = AppDataSource.getRepository(Properties)
    // const property = await propertiesRepository.findOne({
    //     where:{
    //         category: categoryÇ
          
    //     },
    //     relations:{
    //         category: true
    //     }
    // })
    // console.log(property)
    // return property!
}

export default listCategoryPropertyService