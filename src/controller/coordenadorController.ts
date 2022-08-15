import knex from '../database/conection';
import multerConfig from '../config/multer';
import multer from 'multer'
import { Response, Request, Router } from  "express";
import instrutorAuth from '../middlewre/professor'
import adminAuth from '../middlewre/adm'

const upload = multer(multerConfig);

const CoordenadorController=Router();
//Papel do Instrutor
CoordenadorController.get('/coordenador',instrutorAuth,async (req:Request, resp: Response)=>{
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
CoordenadorController.get('/perfilFormador_',instrutorAuth,async (req:Request, resp: Response)=>{
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
CoordenadorController.get('/definicoesFormador_',instrutorAuth,async (req:Request, resp: Response)=>{
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
CoordenadorController.get('/alunosFormador',instrutorAuth,async (req:Request, resp: Response)=>{
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
CoordenadorController.post('/adicionarCoordenador',upload.single('image'),adminAuth, async (req:Request, resp: Response)=>{
  try{
    const {nomeCoordenador, emailCoordenador,NIFCoordenador, userCoordenador, telCoordenador, enderecoCoordenador, residenciaCoordenador, descricaoCoordenador}=req.body;
    const senhaCoordenador='12345678';
    const imgCoordenador= (req.file) ? req.file.filename : 'user.png';
    // console.log(NIFCoordenador);
    
    
    if(!(nomeCoordenador===''|| userCoordenador===''|| emailCoordenador===''||telCoordenador==='' || NIFCoordenador=="")){
      
      let re = /[A-Z]/;
      const hasUpper = re.test(userCoordenador);
      const verificaEspaco = /\s/g.test(userCoordenador);
      const Mailer = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/.test(emailCoordenador);
      const number = /^[9]{1}[0-9]{8}$/.test(telCoordenador)
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
                 if (senhaCoordenador.length < 5) {
                  resp.json({error:'Senha muito fraca'})
            // resp.redirect("/cadastrarCliente")
                 } else
                    if (senhaCoordenador != '12345678') {
                      resp.json({error:'Senha Diferentes'})
            // resp.redirect("/cadastrarCliente")
     
                    } else if(number == false) {
                      resp.json({error:'Numero de telefone incorreto'})
            // resp.redirect("/cadastrarCliente")
        
                    }else{ 
                       
                          const verify= await knex('coordenador').where('emailCoordenador', emailCoordenador).orWhere('userCoordenador', userCoordenador).orWhere('telCoordenador', telCoordenador)
                          if(verify.length===0){
                          
                          const descricaoProf=descricaoCoordenador
                          const d=new Date();
                          const estadoCoordenador=1
                            const ids = await knex('coordenador')
                            .insert({imgCoordenador,nivelCoordenador:20, nomeCoordenador,telCoordenador,residenciaCoordenador, userCoordenador, emailCoordenador,estadoCoordenador, senhaCoordenador, enderecoCoordenador, admProf:0, descricaoProf, NIFCoordenador })
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
CoordenadorController.get('/cursoFormador/:id',instrutorAuth,async (req:Request, resp: Response)=>{
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
CoordenadorController.get('/cursoFormador',instrutorAuth,async (req:Request, resp: Response)=>{
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
export default CoordenadorController;

//image, name, email, whatsaap, nomeuser senha


