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
          
          const cursos= await knex('curso').join('professor', 'curso.idProf', 'professor.idProf')
          .join('categoria', 'curso.idCategoria', 'categoria.idCategoria');
          const alunos= await knex('aluno').select('*');
          const professores= await knex('professor').select('*');
          const coordenador= await knex('coordenador').select('*');
          const matricula= await knex('matricula').join('aluno', 'matricula.idAluno', 'aluno.idAluno')
          .join('curso', 'matricula.idCurso', 'curso.idCurso')
          const rentavel= await knex('matricula').join('curso', 'matricula.idCurso', 'curso.idCurso').groupBy('matricula.idCurso').sum('precoCurso', {as:'quantidade'}).orderBy('precoCurso','desc').select('curso.nomeCurso').limit(10);
          const rentavelQ= await knex('matricula').join('curso', 'matricula.idCurso', 'curso.idCurso').where('matricula.estadoMatricula',1).groupBy('matricula.idCurso').sum('precoCurso', {as:'quantidade'}).orderBy('quantidade','desc').limit(10)
          const rentavelP= await knex('matricula').join('curso', 'matricula.idCurso', 'curso.idCurso').where('matricula.estadoMatricula',0).groupBy('matricula.idCurso').sum('precoCurso', {as:'quantidade'}).orderBy('quantidade','desc').limit(10)
          const nomeRentavel=rentavel.map((c:any)=>c.nomeCurso)
          const quantidadeRentavel=rentavelQ.map((c:any)=>c.quantidade)
          const quantidadeRentavelP=rentavelP.map((c:any)=>c.quantidade)

          const maiorInscritos= await knex('matricula').join('curso', 'matricula.idCurso', 'curso.idCurso').groupBy('matricula.idCurso').count('matricula.idCurso', {as:'inscritos'}).orderBy('inscritos','desc').select('*').limit(4)
          
          resp.render('admin/index', {alunos, cursos, professores, admin, coordenador, matricula, nomeRentavel, quantidadeRentavel, quantidadeRentavelP, maiorInscritos});
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
        resp.render('admin/Formador/listaFormador', {alunos, cursos, professores, admin});
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
      resp.render('admin/Formador/perfilFormador_', {alunos,prof, cursos, professores, admin});
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
    const prof=await knex('professor').where('idProf',id).first()    
    if(admin && prof){
      const cursos= await knex('curso').where('idProf',id)
      const alunos= await knex('aluno').select('*');
      const professores= await knex('professor').select('*');
      resp.render('admin/Formador/actividadeFormador', {alunos,prof, cursos, professores, admin});
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
    const prof=await knex('professor').where('idProf',id).first();    
    if(admin && prof){
      const cursos= await knex('curso').where('idProf', id)
      const alunos= await knex('aluno').select('*');
      const professores= await knex('professor').select('*');
      resp.render('admin/Formador/editarFormador', {alunos,prof, cursos, professores, admin});
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
    const prof=await knex('professor').where('idProf',id).first()    
    if(admin && prof){
      const cursos= await knex('curso').where('idProf', id);
      const alunos= await knex('aluno').select('*');
      const professores= await knex('professor').select('*');
      resp.render('admin/Formador/formadorCurso_', {alunos,prof, cursos, professores, admin});
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
      resp.render('admin/Formador/addFormador', {alunos, cursos, professores, admin});
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
      resp.render('admin/Aluno/listaAluno', {alunos, cursos, professores, admin});
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
    const aluno=await knex('aluno').where('idAluno',id).first()    
    if(admin && aluno){
      const cursos= await knex('curso').select('*');
      const alunos= await knex('aluno').select('*');
      const professores= await knex('professor').select('*');
      resp.render('admin/Aluno/perfilAluno_', {alunos,aluno, cursos, professores, admin});
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
    const aluno=await knex('aluno').where('idAluno',id).first()    
    if(admin && aluno){
      const cursos= await knex('curso').select('*');
      const alunos= await knex('aluno').select('*');
      const professores= await knex('professor').select('*');
      resp.render('admin/Aluno/aprendizadoAluno', {alunos,aluno, cursos, professores, admin});
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
    const aluno=await knex('aluno').where('idAluno',id).first()    
    if(admin && aluno){
      const cursos= await knex('curso').select('*');
      const alunos= await knex('aluno').select('*');
      const professores= await knex('professor').select('*');
      resp.render('admin/Aluno/editarAluno', {alunos,aluno, cursos, professores, admin});
    }else{
      resp.render('error/404')
    }       
  } catch (error) {
    console.log(error);
    resp.render('error/404')
  }
}    
)
AdmController.get('/actividadesAluno/:id',adminAuth,async (req:Request, resp: Response)=>{
  try {
    const idUser=req.session?.user.id;
    const {id}=req.params
    const admin= await knex('professor').where('idProf', idUser).first();    
    const aluno=await knex('aluno').where('idAluno',id).first()    
    if(admin && aluno){
      const cursos= await knex('curso').select('*');
      const alunos= await knex('aluno').select('*');
      const professores= await knex('professor').select('*');
      resp.render('admin/Aluno/actividadeAluno', {alunos,aluno, cursos, professores, admin});
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
      const cursos= await knex('curso').leftJoin('categoria', 'curso.idCategoria', 'categoria.idCategoria').select('*');
      const alunos= await knex('aluno').select('*');
      const professores= await knex('professor').select('*');
      resp.render('admin/Curso/listaCurso', {alunos, cursos, professores, admin});
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
      resp.render('admin/Curso/addCurso', {alunos, cursos, professores, admin});
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
      resp.render('admin/Curso/perfilCurso_', {alunos,aluno, cursos, professores, admin});
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
      resp.render('admin/Curso/alunoCurso', {alunos,aluno, cursos, professores, admin});
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
      resp.render('admin/Curso/arquivoCurso', {alunos,aluno, cursos, professores, admin});
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
      resp.render('admin/Curso/editarCurso', {alunos,aluno, cursos, professores, admin});
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
      resp.render('admin/Curso/actividadeCurso', {alunos,aluno, cursos, professores, admin});
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


