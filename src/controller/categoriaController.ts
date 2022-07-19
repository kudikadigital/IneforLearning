import knex from '../database/conection';
import multerConfig from '../config/multer';
import multer from 'multer'
import { Response, Request, Router } from  "express";
import adminAuth from '../middlewre/adm'

const upload = multer(multerConfig);

const CategoriaController=Router();
//Papel do Admin
CategoriaController.get('/novaCategoria',adminAuth,async (req:Request, resp: Response)=>{
      try {
        const idUser=req.session?.user.id;
        const admin= await knex('professor').where('idProf', idUser).first();        
        if(admin){
          const cursos= await knex('curso').select('*');
          const alunos= await knex('aluno').select('*');
          const professores= await knex('professor').select('*');
          resp.render('admin/index', {alunos, cursos, professores, admin});
        }else{
          resp.render('error/404')
        }       
      } catch (error) {
        console.log(error);
        resp.render('error/404')
      }
    }    
)

export default CategoriaController;

//image, name, email, whatsaap, nomeuser senha


