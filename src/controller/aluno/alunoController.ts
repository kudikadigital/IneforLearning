import knex from '../../database/conection';
import { Response, Request } from "express";
// import bCryptjs from 'bcryptjs'

class AlunoController{
    async criarAluno(req:Request, resp: Response){
        const {name, whatsaap, nomeuser, senha, email}= req.body;
        const image= (req.file) ? req.file.filename : 'user.png';
        const verify= await knex('aluno').where('nomeuser', nomeuser).orWhere('email', email)
        if(verify.length===0){
          const ids = await knex('aluno').insert({image, name, email, whatsaap, nomeuser, senha})
          const aluno = await knex('aluno').where('id', ids[0])
          resp.send(aluno)
        }else{
          resp.redirect('/')
        }
    }    
   async listarAluno(req:Request, resp:Response) {
       const alunos= await knex('aluno').select('*')
       resp.json(alunos)
   }
  async cursosAlunos(req:Request, resp:Response){
    const cursos = await knex('aluno-curso').where('')
  }
  async alunoPainel(req:Request, resp:Response){
    if(req.session){
      resp.render('./aluno/alunoPainel.ejs', {aluno:req.session.aluno})
    }
    
  }
  async loginAluno(req:Request, resp: Response){
    try{
      const {email, senha}= req.body;
      const user= await knex('aluno').where('email', email).andWhere('senha', senha)
      if(user.length!==0){
        const aluno= user[0]
        if(req.session){
          req.session.aluno=aluno;
          resp.redirect('AlunoPainel')
        }                
      }else{
        resp.redirect('/')
      }
    }catch(e){}
  } 
  
}

export default AlunoController;


//image, name, email, whatsaap, nomeuser senha

