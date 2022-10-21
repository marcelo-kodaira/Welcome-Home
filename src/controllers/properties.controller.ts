import { Request, Response } from "express";
import { IAddressRequest, IPropertyRequest } from "../interfaces/properties";
import createPropertyService from "../services/property/createProperty.service";
import listPropertyService from "../services/property/listProperty.service";

const createPropertyController= async (req: Request, res: Response) =>{
    const data:IPropertyRequest = req.body
    const property = await createPropertyService(data)
    return res.status(201).json(property)
}

const listPropertyController = async(req:Request, res: Response) =>{
    const listProperties = await listPropertyService()
    return res.status(200).json(listProperties)
}



export {createPropertyController,listPropertyController}