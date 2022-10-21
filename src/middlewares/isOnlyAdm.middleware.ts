import { Request, Response, NextFunction, response } from "express";
import { AppError } from "../Error/AppError";

const isOnlyAdmMiddleware = async (req: Request, res: Response, next: NextFunction) =>{

    if(!req.user.isAdm){
        throw new AppError("Unauthorized",403)
    }
    next()
}

export default isOnlyAdmMiddleware