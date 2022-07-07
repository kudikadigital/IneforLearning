import knex from '../database/conection';
import multerConfig from '../config/multer';
import multer from 'multer'
import { Response, Request, Router } from  "express";
import instrutorAuth from '../middlewre/professor'

const upload = multer(multerConfig);

const ProfessorController=Router();
//Papel do Instrutor
ProfessorController.get('/instrutor',instrutorAuth,async (req:Request, resp: Response)=>{
  try{
      const idUser=req.session?.user.id;
      const professor= await knex('professor').where('idProf', idUser).first();        
      if(professor){
        const cursos= await knex('curso').where('idProf', idUser).select('*');
        const alunos= await knex('curso').join('matricula', 'curso.idCurso', 'matricula.idCurso').where('idProf', idUser);
        
        resp.render('professor/index', {alunos, cursos, professor});
      }else{
        resp.render('error/404')
      }       
    } catch (error) {
      console.log(error);
      resp.render('error/404')
    }
  }    
)

export default ProfessorController;

//image, name, email, whatsaap, nomeuser senha


