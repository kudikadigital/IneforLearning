import { Response, Request, NextFunction } from "express";
const admAuth= (req:Request, resp:Response, next:NextFunction)=>{

    if(req.session){
        if(req.session.adm!==undefined){
            next();
        }else{
            resp.redirect('/')
        }
    }else{
        resp.redirect('/')
    }
}


export {admAuth};