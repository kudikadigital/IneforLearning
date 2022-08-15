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
//Adicionar Professor
ProfessorController.post('/adicionarProf',upload.single('image'),adminAuth, async (req:Request, resp: Response)=>{
  try{
    const {nomeProf, emailProf, userProf, telProf, enderecoProf, residenciaProf, descProf}=req.body;
    const senhaProf='12345678';
    const imgProf= (req.file) ? req.file.filename : 'user.png';

    
    if(!(nomeProf===''|| userProf===''|| emailProf===''||telProf==='')){
      
      let re = /[A-Z]/;
      const hasUpper = re.test(userProf);
      const verificaEspaco = /\s/g.test(userProf);
      const Mailer = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/.test(emailProf);
      const number = /^[9]{1}[0-9]{8}$/.test(telProf)
     if (hasUpper === true) {
              
            resp.json({error:'Username não aceite'})
            // resp.redirect("/cadastrarCliente") 
           } else if (verificaEspaco === true) {
            resp.json({error:'Username não aceite'})
            
            // resp.redirect("/cadastrarCliente")
     
           } else
              if (!Mailer) {
                resp.json({error:'Email não aceite'})
            // resp.redirect("/cadastrarCliente")
              } else
                 if (senhaProf.length < 5) {
                  resp.json({error:'Senha muito fraca'})
            // resp.redirect("/cadastrarCliente")
                 } else
                    if (senhaProf != '12345678') {
                      resp.json({error:'Senha Diferentes'})
            // resp.redirect("/cadastrarCliente")
     
                    } else if(number == false) {
                      resp.json({error:'Numero de telefone incorreto'})
            // resp.redirect("/cadastrarCliente")
        
                    }else{ 
                       
                          const verify= await knex('professor').where('emailProf', emailProf).orWhere('userProf', userProf).orWhere('telProf', telProf)
                          if(verify.length===0){
                          
                          const descricaoProf=descProf
                          const d=new Date();
                          const estadoProf=1
                          const NIFProf='Sem NIF'
                            const ids = await knex('professor')
                            //,nivelProf:20
                            .insert({imgProf,nivelProf:20, nomeProf,telProf,residenciaProf, userProf, emailProf,estadoProf, senhaProf, enderecoProf, admProf:0, descricaoProf, NIFProf })
                            resp.json({certo:'Formador cadastrado com sucesso'})
                          
                          }else{
                            resp.json({error:'Formador já cadastrado ou alguns dados já vinculados com outra conta!'})
                            //resp.redirect("/cadastrarCliente")
                          
                          }
                       
                    
                    }
     
     }else{
      resp.json({error:"Ocorreu um problema!"})
     } 
    } catch (error) {
     
    }
  }    
)
//Perfil do Curso
ProfessorController.get('/cursoFormador/:id',instrutorAuth,async (req:Request, resp: Response)=>{
  try{
      const idUser=req.session?.user.id;
      const {id} = req.params
      const professor= await knex('professor').where('idProf', idUser).first();   
      const cursos= await knex('curso').where('idCurso', id);     
      if(professor && cursos){       
        const matriculas= await knex('matricula').leftJoin('curso', 'curso.idCurso', 'matricula.idCurso').where('curso.idProf', idUser).count('matricula.idCurso', {as:'quantidade'}).orderBy('quantidade','desc').select('*')
        const cursosTotal= await knex('curso').join('categoria', 'curso.idCategoria', 'categoria.idCategoria').where('idProf', idUser)
        const matricula= await knex('matricula').select('*')
        resp.render('professor/cursoFormador', {matriculas, cursos, professor, cursosTotal, matricula});
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
export default ProfessorController;

//image, name, email, whatsaap, nomeuser senha


