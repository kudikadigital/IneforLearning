import { Response, Request, NextFunction } from "express";
const alunoAuth= (req:Request, resp:Response, next:NextFunction)=>{

    if(req.session){
        if(req.session.aluno!==undefined){
            next();
        }else{
            resp.redirect('/')
        }
    }else{
        resp.redirect('/')
    }
}


export {alunoAuth};