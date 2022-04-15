import knex from '../../database/conection';
import { Response, Request } from "express";
// import bCryptjs from 'bcryptjs'

class AlunoController{
  async criarAluno(req:Request, resp: Response){
    try {
      const {name, tell, user, pass, email}= req.body; 
      const estado = "0"
      const image= (req.file) ? req.file.filename : 'user.png';
      const verify= await knex('aluno').where('nomeAluno', name).orWhere('emailAluno', email)
      if(verify.length===0){
        const ids = await knex('aluno').insert({image, name, email, tell, user, pass, estado})
        const aluno = await knex('aluno').where('idAluno', ids[0])
        //resp.send(aluno)
        resp.send("Cadastrado") 
        
        //cod«ndições para quando o Adm cadastra e quando o Aluno se cadastra
      }else{
        resp.send('Nome de usuário já existe, troca por um outro') 
      }
    } catch (error) {
      resp.send(error + " - falha ao registar")
    }
  }    
  async listarAluno(req:Request, resp:Response) {
      const alunos= await knex('aluno').select('*')
      resp.render("admin/alunos",  {adm:req.session?.adm, alunos})
  }
  
  async cursosAlunos(req:Request, resp:Response){
    const cursos = await knex('aluno-curso').where('') 
    resp.json(cursos)  
  }

  async alunoPainel(req:Request, resp:Response){
    const cursos= await knex('curso').select('*')
    resp.render('aluno/index', {aluno:req.session?.aluno, cursos})
  }

  async criarAlunoView(req:Request, resp:Response){
    resp.render("admin/cadastraraluno", {adm:req.session?.adm})
  }

  async alunocursos(req:Request, resp:Response){
    resp.render("aluno/cursosemandamento", {aluno:req.session?.aluno})
  }

  async alunoCursosTerminados(req:Request, resp:Response){
    resp.render("aluno/cursosterminados", {aluno:req.session?.aluno})
  }


}

export default AlunoController;

//image, name, email, whatsaap, nomeuser senha

