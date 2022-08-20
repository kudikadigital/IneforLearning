import knex from '../database/conection';
import multerConfig from '../config/multer';
import multer from 'multer'
import { Response, Request, Router } from  "express";
import instrutorAuth from '../middlewre/professor'
import adminAuth from '../middlewre/adm'

const upload = multer(multerConfig);

const ProfessorController=Router();
//Papel do Instrutor
ProfessorController.get('/instrutor',instrutorAuth,async (req:Request, resp: Response)=>{
  try{
      const idUser=req.session?.user.id;
      const professor= await knex('professor').where('idProf', idUser).first();        
      if(professor){
        const cursos= await knex('curso').where('idProf', idUser)
        const matriculas= await knex('matricula').leftJoin('curso', 'curso.idCurso', 'matricula.idCurso').where('curso.idProf', idUser).count('matricula.idCurso', {as:'quantidade'}).orderBy('quantidade','desc').select('*')
        const cursosTotal= await knex('curso').join('categoria', 'curso.idCategoria', 'categoria.idCategoria').where('idProf', idUser)
        const matricula= await knex('matricula').select('*')
        resp.render('professor/index', {matriculas, cursos, professor, cursosTotal, matricula});
      }else{
        resp.render('error/404')
      }       
    } catch (error) {
      console.log(error);
      resp.render('error/404')
    }
  }    
)
//Perfil Formador
ProfessorController.get('/perfilFormador_',instrutorAuth,async (req:Request, resp: Response)=>{
  try{
      const idUser=req.session?.user.id;
      const prof= await knex('professor').where('idProf', idUser).first();        
      if(prof){
        const cursos= await knex('curso').where('idProf', idUser)
        const matriculas= await knex('matricula').join('curso', 'curso.idCurso', 'matricula.idCurso').where('curso.idProf', idUser).count('matricula.idCurso', {as:'quantidade'}).orderBy('quantidade','desc').select('*')
        const cursosTotal= await knex('curso').join('categoria', 'curso.idCategoria', 'categoria.idCategoria').where('idProf', idUser)
        resp.render('professor/perfilFormador', {matriculas, cursos, prof,professor:prof, cursosTotal});
      }else{
        resp.render('error/404')
      }       
    } catch (error) {
      console.log(error);
      resp.render('error/404')
    }
  }    
)
//Definição do formador
ProfessorController.get('/definicoesFormador_',instrutorAuth,async (req:Request, resp: Response)=>{
  try{
      const idUser=req.session?.user.id;
      const prof= await knex('professor').where('idProf', idUser).first();        
      if(prof){
        const cursos= await knex('curso').where('idProf', idUser)
        const matriculas= await knex('matricula').join('curso', 'curso.idCurso', 'matricula.idCurso').where('curso.idProf', idUser).count('matricula.idCurso', {as:'quantidade'}).orderBy('quantidade','desc').select('*')
        const cursosTotal= await knex('curso').join('categoria', 'curso.idCategoria', 'categoria.idCategoria').where('idProf', idUser)
        resp.render('professor/definicoesFormador', {matriculas, cursos, prof,professor:prof, cursosTotal});
      }else{
        resp.render('error/404')
      }       
    } catch (error) {
      console.log(error);
      resp.render('error/404')
    }
  }    
)
//Alunos Formador
ProfessorController.get('/alunosFormador',instrutorAuth,async (req:Request, resp: Response)=>{
  try{
      const idUser=req.session?.user.id;
      const professor= await knex('professor').where('idProf', idUser).first();        
      if(professor){
        const cursos= await knex('curso').where('idProf', idUser)
        const matriculas= await knex('matricula').leftJoin('curso', 'curso.idCurso', 'matricula.idCurso').where('curso.idProf', idUser).count('matricula.idCurso', {as:'quantidade'}).orderBy('quantidade','desc').select('*')
        const cursosTotal= await knex('curso').join('categoria', 'curso.idCategoria', 'categoria.idCategoria').where('idProf', idUser)
        const matricula= await knex('matricula').join('aluno', 'matricula.idAluno', 'aluno.idAluno').groupBy('matricula.idAluno').count('matricula.idAluno', {as:'quantidadeAluno'}).select('*')
        resp.render('professor/Aluno/alunosFormador', {matriculas, cursos, professor, cursosTotal, matricula});
      }else{
        resp.render('error/404')
      }       
    } catch (error) {
      console.log(error);
      resp.render('error/404')
    }
  }    
)

//Perfil do Curso
ProfessorController.get('/cursoFormador/:id',instrutorAuth,async (req:Request, resp: Response)=>{
  try {
    const idUser=req.session?.user.id;
    const {id}=req.params
    const professor= await knex('professor').where('idProf', idUser).first();    
    const matriculas= await knex('matricula').join('curso', 'curso.idCurso', 'matricula.idCurso').join('aluno', 'aluno.idAluno', 'matricula.idAluno').where('curso.idCurso', id)
    const curso= await knex('curso').join('categoria', 'curso.idCategoria', 'categoria.idCategoria').join('professor', 'curso.idProf', 'professor.idProf').where('idCurso', id).first();
    if(professor && curso){
      resp.render('professor/Curso/perfilCursoFormador_', { curso, matriculas, professor});
    }else{
      resp.render('error/404')
    }       
  } catch (error) {
    console.log(error);
    resp.render('error/404')
  }   
})

//Lista do Curso
ProfessorController.get('/cursoFormador',instrutorAuth,async (req:Request, resp: Response)=>{
  try{
      const idUser=req.session?.user.id;
      const professor= await knex('professor').where('idProf', idUser).first();   
      const cursos= await knex('curso').join('categoria', 'curso.idCategoria', 'categoria.idCategoria').where('idProf', idUser)  
      if(professor && cursos){       
        const matriculas= await knex('matricula').leftJoin('curso', 'curso.idCurso', 'matricula.idCurso').where('curso.idProf', idUser).count('matricula.idCurso', {as:'quantidade'}).orderBy('quantidade','desc').select('*')
        const cursosTotal= await knex('curso').join('categoria', 'curso.idCategoria', 'categoria.idCategoria').where('idProf', idUser)
        const matricula= await knex('matricula').select('*');
        const dadosConta= await knex('dadosBanco').where('idProf', idUser).first()
        resp.render('professor/Curso/cursoFormador', {matriculas, cursos, professor, cursosTotal, matricula, dadosConta});
      }else{
        resp.render('error/404')
      }       
    } catch (error) {
      console.log(error);
      resp.render('error/404')
    }
  }    
)

//Lista Modulo Curso 
ProfessorController.get('/moduloPerfil/:id/:idModulo',instrutorAuth,async (req:Request, resp: Response)=>{
  try {
    const idUser=req.session?.user.id;
    const {id, idModulo}=req.params;
    const modulo= await knex('moduloCurso').where('idModulo', idModulo)
    const professor= await knex('professor').where('idProf', idUser).first();    
    const matriculas= await knex('matricula').join('curso', 'curso.idCurso', 'matricula.idCurso').join('aluno', 'aluno.idAluno', 'matricula.idAluno').where('curso.idCurso', id)
    const curso= await knex('curso').join('categoria', 'curso.idCategoria', 'categoria.idCategoria').join('professor', 'curso.idProf', 'professor.idProf').where('idCurso', id).first();
    if(professor && curso){
      resp.render('professor/Curso/modeuloPerfil', { curso, matriculas, professor, modulo});
    }else{
      resp.render('error/404')
    }       
  } catch (error) {
    console.log(error);
    resp.render('error/404')
  }   
})

//Perfil Modulo Curso 
ProfessorController.get('/moduloCurso/:id',instrutorAuth,async (req:Request, resp: Response)=>{
  try {
    const idUser=req.session?.user.id;
    const {id}=req.params
    const modulo= await knex('moduloCurso').where('idCurso', id)
    const professor= await knex('professor').where('idProf', idUser).first();    
    const matriculas= await knex('matricula').join('curso', 'curso.idCurso', 'matricula.idCurso').join('aluno', 'aluno.idAluno', 'matricula.idAluno').where('curso.idCurso', id)
    const curso= await knex('curso').join('categoria', 'curso.idCategoria', 'categoria.idCategoria').join('professor', 'curso.idProf', 'professor.idProf').where('idCurso', id).first();
    if(professor && curso){
      resp.render('professor/Curso/moduloCurso', { curso, matriculas, professor, modulo});
    }else{
      resp.render('error/404')
    }       
  } catch (error) {
    console.log(error);
    resp.render('error/404')
  }   
})

//Adicionar Modulo
ProfessorController.post('/adicionarModulo',upload.single('image'), instrutorAuth,async (req:Request, resp: Response)=>{
  try {

    const {idCurso,descricaoModulo, tituloModulo, tituloModulo_}= req.body;
    const imgModulo=(req.file)?req.file.filename : 'user.png';
    if(idCurso=="" || descricaoModulo=="" || tituloModulo=="" || tituloModulo_==""  ){
      resp.json({rota:'moduloCurso/'+idCurso, errado:'Modulo não adicionado'})
    }else{
      const modulo= await knex('moduloCurso').insert({idCurso,descricaoModulo, tituloModulo, tituloModulo_, imgModulo})
      resp.json({rota:'moduloCurso/'+idCurso, certo:'Modulo adicionado'})
    }
  } catch (error) {
    console.log(error);
    resp.render('error/404')
  }   
})

export default ProfessorController;

//image, name, email, whatsaap, nomeuser senha


