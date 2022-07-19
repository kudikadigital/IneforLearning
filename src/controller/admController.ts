import knex from '../database/conection';
import multerConfig from '../config/multer';
import multer from 'multer'
import { Response, Request, Router } from  "express";
import adminAuth from '../middlewre/adm'

const upload = multer(multerConfig);

const AdmController=Router();
//Papel do Admin
AdmController.get('/admin',adminAuth,async (req:Request, resp: Response)=>{
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
AdmController.get('/admin/:id',adminAuth,async (req:Request, resp: Response)=>{
  try {
    const {id}=req.params
    const admin= await knex('professor').where('idProf', id).update({admProf:1})  
    resp.json('Deu certo')
  } catch (error) {
    console.log(error);
    resp.render('error/404')
  }
}    
)
AdmController.get('/listarProfessores',async (req:Request, resp: Response)=>{
  try {
    const admin= await knex('professor').select('*');  
    resp.json(admin)
  } catch (error) {
    console.log(error);
    resp.render('error/404')
  }
}    
)


//Parte Formador
AdmController.get('/listaFormador',adminAuth,async (req:Request, resp: Response)=>{
    try {
      const idUser=req.session?.user.id;
      const admin= await knex('professor').where('idProf', idUser).first();        
      if(admin){
        const cursos= await knex('curso').select('*');
        const alunos= await knex('aluno').select('*');
        const professores= await knex('professor').select('*');
        resp.render('admin/listaFormador', {alunos, cursos, professores, admin});
      }else{
        resp.render('error/404')
      }       
    } catch (error) {
      console.log(error);
      resp.render('error/404')
    }
  }    
)
AdmController.get('/perfilFormador_/:id',adminAuth,async (req:Request, resp: Response)=>{
  try {
    const idUser=req.session?.user.id;
    const {id}=req.params
    const admin= await knex('professor').where('idProf', idUser).first();    
    const prof=await knex('professor').where('idProf',id).first()   
    if(admin && prof){
      const cursos= await knex('curso').where('idProf',id).select('*');
      const alunos= await knex('aluno').select('*');
      const professores= await knex('professor').select('*');
      resp.render('admin/perfilFormador_', {alunos,prof, cursos, professores, admin});
    }else{
      resp.render('error/404')
    }       
  } catch (error) {
    console.log(error);
    resp.render('error/404')
  }
}    
)
AdmController.get('/actividadeFormador/:id',adminAuth,async (req:Request, resp: Response)=>{
  try {
    const idUser=req.session?.user.id;
    const {id}=req.params
    const admin= await knex('professor').where('idProf', idUser).first();    
    const aluno=await knex('aluno').where('idAluno',id)    
    if(admin && aluno){
      const cursos= await knex('curso').select('*');
      const alunos= await knex('aluno').select('*');
      const professores= await knex('professor').select('*');
      resp.render('admin/actividadeFormador', {alunos,aluno, cursos, professores, admin});
    }else{
      resp.render('error/404')
    }       
  } catch (error) {
    console.log(error);
    resp.render('error/404')
  }
}    
)
AdmController.get('/editarFormador_/:id',adminAuth,async (req:Request, resp: Response)=>{
  try {
    const idUser=req.session?.user.id;
    const {id}=req.params
    const admin= await knex('professor').where('idProf', idUser).first();    
    const aluno=await knex('aluno').where('idAluno',id)    
    if(admin && aluno){
      const cursos= await knex('curso').select('*');
      const alunos= await knex('aluno').select('*');
      const professores= await knex('professor').select('*');
      resp.render('admin/editarFormador', {alunos,aluno, cursos, professores, admin});
    }else{
      resp.render('error/404')
    }       
  } catch (error) {
    console.log(error);
    resp.render('error/404')
  }
}    
)
AdmController.get('/formadorCurso_/:id',adminAuth,async (req:Request, resp: Response)=>{
  try {
    const idUser=req.session?.user.id;
    const {id}=req.params
    const admin= await knex('professor').where('idProf', idUser).first();    
    const aluno=await knex('aluno').where('idAluno',id)    
    if(admin && aluno){
      const cursos= await knex('curso').select('*');
      const alunos= await knex('aluno').select('*');
      const professores= await knex('professor').select('*');
      resp.render('admin/formadorCurso_', {alunos,aluno, cursos, professores, admin});
    }else{
      resp.render('error/404')
    }       
  } catch (error) {
    console.log(error);
    resp.render('error/404')
  }
}    
)
AdmController.get('/addFormador',adminAuth,async (req:Request, resp: Response)=>{
  try {
    const idUser=req.session?.user.id;
    const admin= await knex('professor').where('idProf', idUser).first();        
    if(admin){
      const cursos= await knex('curso').select('*');
      const alunos= await knex('aluno').select('*');
      const professores= await knex('professor').select('*');
      resp.render('admin/addFormador', {alunos, cursos, professores, admin});
    }else{
      resp.render('error/404')
    }       
  } catch (error) {
    console.log(error);
    resp.render('error/404')
  }
}    
)
//Parte Formador-


//Parte Aluno
AdmController.get('/listaAluno',adminAuth,async (req:Request, resp: Response)=>{
  try {
    const idUser=req.session?.user.id;
    const admin= await knex('professor').where('idProf', idUser).first();        
    if(admin){
      const cursos= await knex('curso').select('*');
      const alunos= await knex('aluno').select('*');
      const professores= await knex('professor').select('*');
      resp.render('admin/listaAluno', {alunos, cursos, professores, admin});
    }else{
      resp.render('error/404')
    }       
  } catch (error) {
    console.log(error);
    resp.render('error/404')
  }
}    
)
AdmController.get('/perfilAluno_/:id',adminAuth,async (req:Request, resp: Response)=>{
  try {
    const idUser=req.session?.user.id;
    const {id}=req.params
    const admin= await knex('professor').where('idProf', idUser).first();    
    const aluno=await knex('aluno').where('idAluno',id)    
    if(admin && aluno){
      const cursos= await knex('curso').select('*');
      const alunos= await knex('aluno').select('*');
      const professores= await knex('professor').select('*');
      resp.render('admin/perfilAluno_', {alunos,aluno, cursos, professores, admin});
    }else{
      resp.render('error/404')
    }       
  } catch (error) {
    console.log(error);
    resp.render('error/404')
  }
}    
)
AdmController.get('/aprendizadoAluno/:id',adminAuth,async (req:Request, resp: Response)=>{
  try {
    const idUser=req.session?.user.id;
    const {id}=req.params
    const admin= await knex('professor').where('idProf', idUser).first();    
    const aluno=await knex('aluno').where('idAluno',id)    
    if(admin && aluno){
      const cursos= await knex('curso').select('*');
      const alunos= await knex('aluno').select('*');
      const professores= await knex('professor').select('*');
      resp.render('admin/aprendizadoAluno', {alunos,aluno, cursos, professores, admin});
    }else{
      resp.render('error/404')
    }       
  } catch (error) {
    console.log(error);
    resp.render('error/404')
  }
}    
)
AdmController.get('/editarAluno/:id',adminAuth,async (req:Request, resp: Response)=>{
  try {
    const idUser=req.session?.user.id;
    const {id}=req.params
    const admin= await knex('professor').where('idProf', idUser).first();    
    const aluno=await knex('aluno').where('idAluno',id)    
    if(admin && aluno){
      const cursos= await knex('curso').select('*');
      const alunos= await knex('aluno').select('*');
      const professores= await knex('professor').select('*');
      resp.render('admin/editarAluno', {alunos,aluno, cursos, professores, admin});
    }else{
      resp.render('error/404')
    }       
  } catch (error) {
    console.log(error);
    resp.render('error/404')
  }
}    
)
AdmController.get('/actividadeAluno/:id',adminAuth,async (req:Request, resp: Response)=>{
  try {
    const idUser=req.session?.user.id;
    const {id}=req.params
    const admin= await knex('professor').where('idProf', idUser).first();    
    const aluno=await knex('aluno').where('idAluno',id)    
    if(admin && aluno){
      const cursos= await knex('curso').select('*');
      const alunos= await knex('aluno').select('*');
      const professores= await knex('professor').select('*');
      resp.render('admin/actividadeAluno', {alunos,aluno, cursos, professores, admin});
    }else{
      resp.render('error/404')
    }       
  } catch (error) {
    console.log(error);
    resp.render('error/404')
  }
}    
)
//Parte Aluno-1

//Parte Curso
AdmController.get('/listaCurso',adminAuth,async (req:Request, resp: Response)=>{
  try {
    const idUser=req.session?.user.id;
    const admin= await knex('professor').where('idProf', idUser).first();        
    if(admin){
      const cursos= await knex('curso').select('*');
      const alunos= await knex('aluno').select('*');
      const professores= await knex('professor').select('*');
      resp.render('admin/listaCurso', {alunos, cursos, professores, admin});
    }else{
      resp.render('error/404')
    }       
  } catch (error) {
    console.log(error);
    resp.render('error/404')
  }
}    
)
AdmController.get('/addCurso',adminAuth,async (req:Request, resp: Response)=>{
  try {
    const idUser=req.session?.user.id;
    const admin= await knex('professor').where('idProf', idUser).first();        
    if(admin){
      const cursos= await knex('curso').select('*');
      const alunos= await knex('aluno').select('*');
      const professores= await knex('professor').select('*');
      resp.render('admin/addCurso', {alunos, cursos, professores, admin});
    }else{
      resp.render('error/404')
    }       
  } catch (error) {
    console.log(error);
    resp.render('error/404')
  }
}    
)
AdmController.get('/perfilCurso_/:id',adminAuth,async (req:Request, resp: Response)=>{
  try {
    const idUser=req.session?.user.id;
    const {id}=req.params
    const admin= await knex('professor').where('idProf', idUser).first();    
    const aluno=await knex('aluno').where('idAluno',id)    
    if(admin && aluno){
      const cursos= await knex('curso').select('*');
      const alunos= await knex('aluno').select('*');
      const professores= await knex('professor').select('*');
      resp.render('admin/perfilCurso_', {alunos,aluno, cursos, professores, admin});
    }else{
      resp.render('error/404')
    }       
  } catch (error) {
    console.log(error);
    resp.render('error/404')
  }
}    
)
AdmController.get('/alunoCurso/:id',adminAuth,async (req:Request, resp: Response)=>{
  try {
    const idUser=req.session?.user.id;
    const {id}=req.params
    const admin= await knex('professor').where('idProf', idUser).first();    
    const aluno=await knex('aluno').where('idAluno',id)    
    if(admin && aluno){
      const cursos= await knex('curso').select('*');
      const alunos= await knex('aluno').select('*');
      const professores= await knex('professor').select('*');
      resp.render('admin/alunoCurso', {alunos,aluno, cursos, professores, admin});
    }else{
      resp.render('error/404')
    }       
  } catch (error) {
    console.log(error);
    resp.render('error/404')
  }
}    
)
AdmController.get('/arquivoCurso/:id',adminAuth,async (req:Request, resp: Response)=>{
  try {
    const idUser=req.session?.user.id;
    const {id}=req.params
    const admin= await knex('professor').where('idProf', idUser).first();    
    const aluno=await knex('aluno').where('idAluno',id)    
    if(admin && aluno){
      const cursos= await knex('curso').select('*');
      const alunos= await knex('aluno').select('*');
      const professores= await knex('professor').select('*');
      resp.render('admin/arquivoCurso', {alunos,aluno, cursos, professores, admin});
    }else{
      resp.render('error/404')
    }       
  } catch (error) {
    console.log(error);
    resp.render('error/404')
  }
}    
)
AdmController.get('/editarCurso/:id',adminAuth,async (req:Request, resp: Response)=>{
  try {
    const idUser=req.session?.user.id;
    const {id}=req.params
    const admin= await knex('professor').where('idProf', idUser).first();    
    const aluno=await knex('aluno').where('idAluno',id)    
    if(admin && aluno){
      const cursos= await knex('curso').select('*');
      const alunos= await knex('aluno').select('*');
      const professores= await knex('professor').select('*');
      resp.render('admin/editarCurso', {alunos,aluno, cursos, professores, admin});
    }else{
      resp.render('error/404')
    }       
  } catch (error) {
    console.log(error);
    resp.render('error/404')
  }
}    
)
AdmController.get('/actividadeCurso/:id',adminAuth,async (req:Request, resp: Response)=>{
  try {
    const idUser=req.session?.user.id;
    const {id}=req.params
    const admin= await knex('professor').where('idProf', idUser).first();    
    const aluno=await knex('aluno').where('idAluno',id)    
    if(admin && aluno){
      const cursos= await knex('curso').select('*');
      const alunos= await knex('aluno').select('*');
      const professores= await knex('professor').select('*');
      resp.render('admin/actividadeCurso', {alunos,aluno, cursos, professores, admin});
    }else{
      resp.render('error/404')
    }       
  } catch (error) {
    console.log(error);
    resp.render('error/404')
  }
}    
)

//Parte Curso-1

//Parte Categoria
AdmController.get('/listaCategoria',adminAuth,async (req:Request, resp: Response)=>{
  try {
    const idUser=req.session?.user.id;
    const admin= await knex('professor').where('idProf', idUser).first();        
    if(admin){
      const cursos= await knex('curso').select('*');
      const alunos= await knex('aluno').select('*');
      const professores= await knex('professor').select('*');
      resp.render('admin/listaCategoria', {alunos, cursos, professores, admin});
    }else{
      resp.render('error/404')
    }       
  } catch (error) {
    console.log(error);
    resp.render('error/404')
  }
}    
)
AdmController.get('/addCategoria',adminAuth,async (req:Request, resp: Response)=>{
  try {
    const idUser=req.session?.user.id;
    const admin= await knex('professor').where('idProf', idUser).first();        
    if(admin){
      const cursos= await knex('curso').select('*');
      const alunos= await knex('aluno').select('*');
      const professores= await knex('professor').select('*');
      resp.render('admin/addCategoria', {alunos, cursos, professores, admin});
    }else{
      resp.render('error/404')
    }       
  } catch (error) {
    console.log(error);
    resp.render('error/404')
  }
}    
)
//Parte Categoria-1


//Parte Coordenador
AdmController.get('/listaCoordenador',adminAuth,async (req:Request, resp: Response)=>{
  try {
    const idUser=req.session?.user.id;
    const admin= await knex('professor').where('idProf', idUser).first();        
    if(admin){
      const cursos= await knex('curso').select('*');
      const alunos= await knex('aluno').select('*');
      const professores= await knex('professor').select('*');
      resp.render('admin/listaCoordenador', {alunos, cursos, professores, admin});
    }else{
      resp.render('error/404')
    }       
  } catch (error) {
    console.log(error);
    resp.render('error/404')
  }
}    
)
AdmController.get('/addCoordenador',adminAuth,async (req:Request, resp: Response)=>{
  try {
    const idUser=req.session?.user.id;
    const admin= await knex('professor').where('idProf', idUser).first();        
    if(admin){
      const cursos= await knex('curso').select('*');
      const alunos= await knex('aluno').select('*');
      const professores= await knex('professor').select('*');
      resp.render('admin/addCoordenador', {alunos, cursos, professores, admin});
    }else{
      resp.render('error/404')
    }       
  } catch (error) {
    console.log(error);
    resp.render('error/404')
  }
}    
)
//Parte Coodernador-1
export default AdmController;

//image, name, email, whatsaap, nomeuser senha


