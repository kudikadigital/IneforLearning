import knex from '../database/conection';
import { Response, Request } from "express";

class servicoController{
    async criarServico(req:Request, resp: Response){
        const { name, desc, preco}= req.body;
        const image= (req.file) ? req.file.filename : 'user.png';
        const ids = await knex('servico').insert({image, name, desc, preco})
        const servico = await knex('servico').where('id', ids[0])
        resp.json(servico)
    }    
   async listarServico(req:Request, resp:Response) {
       const servico= await knex('servico').select('*')
       resp.json(servico)
   }
}

export default servicoController;
//image, name, desc, preco


