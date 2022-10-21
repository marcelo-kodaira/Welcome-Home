import { Request, Response } from "express";
import { ICategoryRequest } from "../interfaces/categories";
import createCategoryService from "../services/category/createCategory.service";
import listCategoryService from "../services/category/listCategory.service";
import listCategoryPropertyService from "../services/category/listCategoryProperty.service";

const createCategoryController = async (req: Request, res:Response)=>{
    const {name}:ICategoryRequest = req.body
    const createCategory = await createCategoryService(name)
    return res.status(201).json(createCategory)
}

const listCategoryController = async (req: Request, res: Response) =>{
    const listCategory = await listCategoryService()
    return res.status(200).json(listCategory)
}

const listCategoryPropertyController = async(req: Request, res: Response) =>{
    const {id} = req.params
    const listCategoryProperty = await listCategoryPropertyService(id)
    return res.status(200).json(listCategoryProperty)
}

export {createCategoryController,listCategoryController,listCategoryPropertyController}