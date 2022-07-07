import knex from '../database/conection';
import multerConfig from '../config/multer';
import multer from 'multer'
import { Response, Request, Router } from  "express";
import adminAuth from '../middlewre/adm'

const upload = multer(multerConfig);

const AlunoController=Router();
//Papel do Admin
AlunoController.get('/aluno',async (req:Request, resp: Response)=>{
      try {
        const idUser=req.session?.user.id;
        const aluno=await knex('aluno').where('idAluno', idUser).first();
        
        if(aluno){
          resp.render('aluno/index', {aluno})
        }else{
          resp.render('error/404')
        }
      } catch (error) {
        resp.render('error/404')
      }
    }    
)


export default AlunoController;

//image, name, email, whatsaap, nomeuser senha


