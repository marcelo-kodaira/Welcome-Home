import { Request, Response, NextFunction } from "express";

const isAdmMiddleware = async (req: Request, res:Response, next: NextFunction) =>{

    const userAdm = req.user.isAdm
    const {id} = req.params

    if(!userAdm && id != req.user.id){
        return res.status(401).json({
            message: 'Forbidden'
        })
    }
    next()

}

export default isAdmMiddleware