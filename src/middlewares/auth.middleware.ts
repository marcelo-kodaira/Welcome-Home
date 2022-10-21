import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { AppError } from "../Error/AppError";

const authMiddleware = (req: Request, res: Response, next: NextFunction) =>{
    try{
        const token = req.headers.authorization?.split(" ")[1]

        jwt.verify(token as string, process.env.SECRET_KEY as string, (err:any,decoded:any) =>{
            
            req.user = {
                id : decoded.sub,
                isAdm : decoded.isAdm
            }
            next()
        })

    }catch(err){
        if(err instanceof Error){
            return res.status(401).json({message: err.message})
        }
    }
}

export default authMiddleware