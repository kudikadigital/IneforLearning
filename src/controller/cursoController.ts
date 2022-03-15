import knex from '../database/conection';
import { Response, Request } from "express";

class CursoController{
    async criarCurso(req:Request, resp: Response){
        const {nome, idProfessor, data_inicio, data_fim, desc, estado}= req.body;
        const image= (req.file) ? req.file.filename : 'user.png';
        const id=await knex('curso').insert({nome, idProfessor, data_inicio, data_fim, desc, estado, image});
        const ids=id[0]
        resp.json({nome, idProfessor, data_inicio, data_fim, desc, estado, image,ids})
    }    
   async listarCurso(req:Request, resp:Response) {
       const cursos= await knex('curso').select('*')
       resp.json({cursos})
   }
}

export default CursoController;

//nome, idProfessor, data-inicio, data-fim, image, desc, estado

