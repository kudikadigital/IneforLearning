import { Response, Request, NextFunction } from "express";
const alunoAuth= (req:Request, resp:Response, next:NextFunction)=>{

    if(req.session){
        if(req.session.aluno!==undefined){
            next();
        }else{
            resp.redirect('/aluno')
        }
    }else{
        resp.redirect('/aluno')
    }
}


export {alunoAuth};