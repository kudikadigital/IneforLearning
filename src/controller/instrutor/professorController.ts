import knex from '../../database/conection';
import { Response, Request } from 'express';

class ProfessorController{
    async criarProfessor(req:Request, resp: Response){
        const {name, email, whatsaap, desc, senha, nomeuser, adm}= req.body;
        const image= (req.file) ? req.file.filename : 'user.png';
        const id=await knex('professor').insert({name,image, email, whatsaap, desc, nomeuser, senha, adm:1});
        const ids=id[0]
        resp.json({name,image, email, whatsaap, desc, senha, ids, nomeuser, adm})
    }
    
    async listarProfessor(req:Request, resp: Response) {
        const data= await knex('professor').select('*')
        resp.json({data})
    }
    async painelProfessor(req:Request, resp: Response) {
      
    }
}

export default ProfessorController;
//image, name, email, whatsaap, desc, nomeuser, senha

