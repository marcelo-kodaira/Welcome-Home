import AppDataSource from "../../data-source"
import { Categories } from "../../entities/categories.entity"
import { AppError } from "../../Error/AppError"
import { ICategoryRequest } from "../../interfaces/categories"

const createCategoryService = async (name: string):Promise<ICategoryRequest> =>{
    const categoryRepository = AppDataSource.getRepository(Categories)
    const categoryExists = await categoryRepository.findOneBy({name})
    if(categoryExists){
        throw new AppError("Esta categoria já existe")
    }

    const createdCategory = categoryRepository.create({
        name
    })
    await categoryRepository.save(createdCategory)

    return createdCategory
}

export default createCategoryService