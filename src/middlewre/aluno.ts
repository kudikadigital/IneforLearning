import { Response, Request, NextFunction } from "express";
const alunoAuth= (req:Request, resp:Response, next:NextFunction)=>{

    if(req.session){
        if(req.session.role!==2){
            next();
        }else{
            resp.redirect('/login')
        }
    }else{
        resp.redirect('/login')
    }
}


export default alunoAuth;