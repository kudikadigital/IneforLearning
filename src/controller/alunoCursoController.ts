import knex from '../database/conection';
import { Response, Request } from "express";

class alunoCursoController{
    async inscrever(req:Request, resp: Response){
        const {idCurso, idAluno}= req.body;
        const ids = await knex('aluno-curso').insert({idCurso, idAluno})
        const aluno = await knex('aluno-curso').where('id', ids[0])
        resp.json(aluno)
    }    
   async listarAluno(req:Request, resp:Response) {
       const alunos= await knex('aluno-curso').select('*')
       resp.json(alunos)
   }
}

export default alunoCursoController;


//image, name, email, whatsaap, nomeuser senha

