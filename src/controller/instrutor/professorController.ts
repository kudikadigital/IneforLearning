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
        const professores= await knex('professor').whereNot('adm', 1)
        const categoria= await knex('categoria').select('*')
        resp.render("admin/instrutores", {adm:req.session?.adm, categoria, professores})
    }
    async painelProfessor(req:Request, resp: Response) {
        if(req.session){
            if(req.session.professor){
              resp.render('', {aluno:req.session.professor})
            }else{
              resp.redirect('/')
            }
          }
    }
    async instrutorNew(req:Request, resp: Response) {
      resp.render('admin/cadastrarinstrutor',{adm:req.session?.adm})
  }

}

export default ProfessorController;
//image, name, email, whatsaap, desc, nomeuser, senha

