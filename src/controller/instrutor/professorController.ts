import knex from '../../database/conection';
import { Response, Request } from 'express'; 

class ProfessorController{
    async criarProfessor(req:Request, resp: Response){
      try {
        const {name, email, whatsaap, senha, desc, adm}= req.body;
        const image= (req.file) ? req.file.filename : 'user.png';
        const estado = 0
        const id=await knex('professor').insert({name,image, email, whatsaap, senha, desc, estado, adm:0});
        const ids=id[0]
        //resp.json({name,image, email, whatsaap, senha, desc, estado, ids, adm}) 
        resp.redirect("/admin/instrutores")
      } catch (error) {
        resp.send(error)
      }
    }
    
    async listarProfessor(req:Request, resp: Response) {
        const professores= await knex('professor').whereNot('adm', 1)
        const categoria= await knex('categoria').select('*')
        resp.render("admin/instrutores", {adm:req.session?.adm, categoria, professores})
    }

    async criarProfView(req:Request, resp:Response){
      resp.render("admin/cadastrarinstrutor", {adm:req.session?.adm})
    }
    async painelProfessor(req:Request, resp: Response) {
      resp.render('admin/instrutores', {adm:req.session?.prof}) 
    }
    async instrutorNew(req:Request, resp: Response) {
      resp.render('admin/cadastrarinstrutor',{adm:req.session?.adm})
    }
    
    async profView(req:Request, resp: Response) {
      resp.render('professor/index', {prof:req.session?.prof}) 
    }

    async profCursos(req:Request, resp: Response) {
      resp.render('professor/cursos', {prof:req.session?.prof}) 
    }

    async profCursosNotificacao(req:Request, resp: Response) {
      resp.render('professor/notificacao', {prof:req.session?.prof}) 
    }
}

export default ProfessorController;
//image, name, email, whatsaap, desc, nomeuser, senha

