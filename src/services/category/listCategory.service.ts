import AppDataSource from "../../data-source"
import { Categories } from "../../entities/categories.entity"

const listCategoryService = async()=>{
    const categoryRepository = AppDataSource.getRepository(Categories)
    const listCategory = await categoryRepository.find()
    return listCategory
}

export default listCategoryService