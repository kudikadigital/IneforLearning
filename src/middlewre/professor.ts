import { Response, Request, NextFunction } from "express";
const profAuth= (req:Request, resp:Response, next:NextFunction)=>{

    if(req.session){
        if(req.session.role==0){
            next();
        }else{
            resp.redirect('/login')
        }
    }else{
        resp.redirect('/login')
    }
}


export default profAuth;