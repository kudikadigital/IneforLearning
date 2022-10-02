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
        const dadosBanco= await knex('dadosBanco').where('idProf', idUser).first();
        const matriculas= await knex('matricula').join('curso', 'curso.idCurso', 'matricula.idCurso').where('curso.idProf', idUser).count('matricula.idCurso', {as:'quantidade'}).orderBy('quantidade','desc').select('*')
        const cursosTotal= await knex('curso').join('categoria', 'curso.idCategoria', 'categoria.idCategoria').where('idProf', idUser)
        resp.render('professor/definicoesFormador', {matriculas, cursos, prof,professor:prof, cursosTotal, dadosBanco});
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
//Adicionar Professor
ProfessorController.post('/adicionarProf', upload.single('image'), adminAuth, async (req: Request, resp: Response) => {
  try {
    const { nomeProf, emailProf, NIFProf, userProf, telProf, enderecoProf, residenciaProf, descProf } = req.body;
    const senhaProf = '12345678';
    const imgProf = (req.file) ? req.file.filename : 'user.png';
    console.log(telProf);
    if (!(nomeProf === '' || userProf === '' || emailProf === '' || telProf === '' || NIFProf == "")) {

      let re = /[A-Z]/;
      const hasUpper = re.test(userProf);
      const verificaEspaco = /\s/g.test(userProf);
      const Mailer = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/.test(emailProf);
      const number = /^[9]{1}[0-9]{8}$/.test(telProf)
      if (hasUpper === true) {

        resp.json({ error: 'Username não aceite' })
        // resp.redirect("/cadastrarCliente") 
      } else if (verificaEspaco === true) {
        resp.json({ error: 'Username não aceite' })

        // resp.redirect("/cadastrarCliente")

      } else
        if (!Mailer) {
          resp.json({ error: 'Email não aceite' })
          // resp.redirect("/cadastrarCliente")
        } else
          if (senhaProf.length < 8) {
            resp.json({ error: 'Senha muito fraca' })
            // resp.redirect("/cadastrarCliente")
          } else
            if (senhaProf != '12345678') {
              resp.json({ error: 'Senha Diferentes' })
              // resp.redirect("/cadastrarCliente")

            } else if (number == false) {
              resp.json({ error: 'Numero de telefone incorreto' })
              // resp.redirect("/cadastrarCliente")

            } else {
              
              
              const verify = await knex('professor').where('emailProf', emailProf).orWhere('userProf', userProf).orWhere('telProf', telProf)
              if (verify.length === 0) {

                const descricaoProf = descProf
                const d = new Date();
                const estadoProf = 1
                const ids = await knex('professor').insert({ imgProf,inefor:1, nivelProf: 20, nomeProf, telProf, residenciaProf, userProf, emailProf, estadoProf, senhaProf, enderecoProf, admProf: 0, descricaoProf, NIFProf })
                resp.json({ certo: 'Formador cadastrado com sucesso' })

              } else {
                resp.json({ error: 'Formador já cadastrado ou alguns dados já vinculados com outra conta!' })
                //resp.redirect("/cadastrarCliente")

              }


            }

    } else {
      resp.json({ error: "Ocorreu um problema!" })
    }
  } catch (error) {
    console.log(error);
    
  }
}
)
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
        const categoria= await knex('categoria').select('*');
        resp.render('professor/Curso/cursoFormador', {matriculas, cursos, professor, cursosTotal, matricula, dadosConta, categoria});
      }else{
        resp.render('error/404')
      }       
    } catch (error) {
      console.log(error);
      resp.render('error/404')
    }
  }    
)
//Perfil Modulo Curso 
ProfessorController.get('/moduloPerfil/:id/:idModulo',instrutorAuth,async (req:Request, resp: Response)=>{
  try {
    const idUser=req.session?.user.id;
    const {id, idModulo}=req.params;
    const modulo= await knex('moduloCurso').where('idModulo', idModulo).first()
    const professor= await knex('professor').where('idProf', idUser).first(); 
    const videos= await knex('videoCurso').join('curso', 'curso.idCurso', 'videoCurso.idCurso').join('moduloCurso', 'moduloCurso.idModulo', 'videoCurso.idModulo').where('videoCurso.idModulo', idModulo) 
    const matriculas= await knex('matricula').join('curso', 'curso.idCurso', 'matricula.idCurso').join('aluno', 'aluno.idAluno', 'matricula.idAluno').where('curso.idCurso', id)
    const curso= await knex('curso').join('categoria', 'curso.idCategoria', 'categoria.idCategoria').join('professor', 'curso.idProf', 'professor.idProf').where('idCurso', id).first();
    if(professor && curso  && modulo){
      resp.render('professor/Curso/moduloPerfil', { curso, matriculas, professor, modulo, videos});
    }else{
      resp.render('error/404')
    }       
  } catch (error) {
    console.log(error);
    resp.render('error/404')
  }   
})
//Ver videos
ProfessorController.get('/cursoVideo/:id',instrutorAuth,async (req:Request, resp: Response)=>{
  try {
    const idUser=req.session?.user.id;
    const {id}=req.params;
    const modulo= await knex('moduloCurso').where('idCurso', id)
    const professor= await knex('professor').where('idProf', idUser).first(); 
    const videos= await knex('videoCurso').join('curso', 'curso.idCurso', 'videoCurso.idCurso').join('moduloCurso', 'moduloCurso.idModulo', 'videoCurso.idModulo').where('videoCurso.idCurso', id) 
    const matriculas= await knex('matricula').join('curso', 'curso.idCurso', 'matricula.idCurso').join('aluno', 'aluno.idAluno', 'matricula.idAluno').where('curso.idCurso', id)
    const curso= await knex('curso').join('categoria', 'curso.idCategoria', 'categoria.idCategoria').join('professor', 'curso.idProf', 'professor.idProf').where('idCurso', id).first();
    if(professor && curso  && modulo){
      resp.render('professor/Curso/cursoVideo', { curso, matriculas, professor, modulo, videos});
    }else{
      resp.render('error/404')
    }       
  } catch (error) {
    console.log(error);
    resp.render('error/404')
  }   
})
//Editar Video
ProfessorController.get('/editarVideo/:id/:idVideo',instrutorAuth,async (req:Request, resp: Response)=>{
  try {
    const idUser=req.session?.user.id;
    const {id, idVideo}=req.params;
    const modulo= await knex('moduloCurso').where('idCurso', id).first()
    const professor= await knex('professor').where('idProf', idUser).first(); 
    const videos= await knex('videoCurso').join('curso', 'curso.idCurso', 'videoCurso.idCurso').join('moduloCurso', 'moduloCurso.idModulo', 'videoCurso.idModulo').where('videoCurso.idVideo', idVideo).first()
    const matriculas= await knex('matricula').join('curso', 'curso.idCurso', 'matricula.idCurso').join('aluno', 'aluno.idAluno', 'matricula.idAluno').where('curso.idCurso', id)
    const curso= await knex('curso').join('categoria', 'curso.idCategoria', 'categoria.idCategoria').join('professor', 'curso.idProf', 'professor.idProf').where('idCurso', id).first();
    if(professor && curso  && modulo && videos){
      resp.render('professor/Curso/editarVideo', { curso, matriculas, professor, modulo, videos});
    }else{
      resp.render('error/404')
    }       
  } catch (error) {
    console.log(error);
    resp.render('error/404')
  }   
})

//Arquivo Curso
ProfessorController.get('/arquivoCursoProf/:id',instrutorAuth,async (req:Request, resp: Response)=>{
  try {
    const idUser=req.session?.user.id;
    const {id}=req.params;
    const modulo= await knex('moduloCurso').where('idCurso', id)
    const professor= await knex('professor').where('idProf', idUser).first(); 
    const videos= await knex('videoCurso').join('curso', 'curso.idCurso', 'videoCurso.idCurso').join('moduloCurso', 'moduloCurso.idModulo', 'videoCurso.idModulo').where('videoCurso.idCurso', id)
    const matriculas= await knex('matricula').join('curso', 'curso.idCurso', 'matricula.idCurso').join('aluno', 'aluno.idAluno', 'matricula.idAluno').where('curso.idCurso', id)
    const curso= await knex('curso').join('categoria', 'curso.idCategoria', 'categoria.idCategoria').join('professor', 'curso.idProf', 'professor.idProf').where('idCurso', id).first();
    if(professor && curso  && modulo && videos){
      resp.render('professor/Curso/arquivoCurso', { curso, matriculas, professor, modulo, videos});
    }else{
      resp.render('error/404')
    }       
  } catch (error) {
    console.log(error);
    resp.render('error/404')
  }   
})

//Actividade curso
ProfessorController.get('/actividadesCurso/:id',instrutorAuth,async (req:Request, resp: Response)=>{
  try {
    const idUser=req.session?.user.id;
    const {id}=req.params;
    const modulo= await knex('moduloCurso').where('idCurso', id)
    const professor= await knex('professor').where('idProf', idUser).first(); 
    const videos= await knex('videoCurso').join('curso', 'curso.idCurso', 'videoCurso.idCurso').join('moduloCurso', 'moduloCurso.idModulo', 'videoCurso.idModulo').where('videoCurso.idCurso', id)
    const matriculas= await knex('matricula').join('curso', 'curso.idCurso', 'matricula.idCurso').join('aluno', 'aluno.idAluno', 'matricula.idAluno').where('curso.idCurso', id)
    const curso= await knex('curso').join('categoria', 'curso.idCategoria', 'categoria.idCategoria').join('professor', 'curso.idProf', 'professor.idProf').where('idCurso', id).first();
    if(professor && curso  && modulo && videos){
      resp.render('professor/Curso/actividadeCurso', { curso, matriculas, professor, modulo, videos});
    }else{
      resp.render('error/404')
    }       
  } catch (error) {
    console.log(error);
    resp.render('error/404')
  }   
})

//Matricula Cursos
ProfessorController.get('/matriculasCurso/:id',instrutorAuth,async (req:Request, resp: Response)=>{
  try {
    const idUser=req.session?.user.id;
    const {id}=req.params;
    const modulo= await knex('moduloCurso').where('idCurso', id)
    const professor= await knex('professor').where('idProf', idUser).first(); 
    const videos= await knex('videoCurso').join('curso', 'curso.idCurso', 'videoCurso.idCurso').join('moduloCurso', 'moduloCurso.idModulo', 'videoCurso.idModulo').where('videoCurso.idCurso', id)
    const matriculas= await knex('matricula').join('curso', 'curso.idCurso', 'matricula.idCurso').join('aluno', 'aluno.idAluno', 'matricula.idAluno').where('curso.idCurso', id).where('estadoMatricula', 1)
    const curso= await knex('curso').join('categoria', 'curso.idCategoria', 'categoria.idCategoria').join('professor', 'curso.idProf', 'professor.idProf').where('idCurso', id).first();
    if(professor && curso  && modulo && videos){
      resp.render('professor/Curso/matriculasCurso', { curso, matriculas, professor, modulo, videos});
    }else{
      resp.render('error/404')
    }       
  } catch (error) {
    console.log(error);
    resp.render('error/404')
  }   
})
//Solitações Cursos
ProfessorController.get('/solicitacoesCurso/:id',instrutorAuth,async (req:Request, resp: Response)=>{
  try {
    const idUser=req.session?.user.id;
    const {id}=req.params;
    const modulo= await knex('moduloCurso').where('idCurso', id)
    const professor= await knex('professor').where('idProf', idUser).first(); 
    const videos= await knex('videoCurso').join('curso', 'curso.idCurso', 'videoCurso.idCurso').join('moduloCurso', 'moduloCurso.idModulo', 'videoCurso.idModulo').where('videoCurso.idCurso', id)
    const matriculas= await knex('matricula').join('curso', 'curso.idCurso', 'matricula.idCurso').join('aluno', 'aluno.idAluno', 'matricula.idAluno').where('curso.idCurso', id).where('estadoMatricula', 0)
    const curso= await knex('curso').join('categoria', 'curso.idCategoria', 'categoria.idCategoria').join('professor', 'curso.idProf', 'professor.idProf').where('idCurso', id).first();
    if(professor && curso  && modulo && videos){
      resp.render('professor/Curso/solicitacoesCurso', { curso, matriculas, professor, modulo, videos});
    }else{
      resp.render('error/404')
    }       
  } catch (error) {
    console.log(error);
    resp.render('error/404')
  }   
})
//Solitações Cursos
ProfessorController.get('/definicoesCurso/:id',instrutorAuth,async (req:Request, resp: Response)=>{
  try {
    const idUser=req.session?.user.id;
    const {id}=req.params;
    const modulo= await knex('moduloCurso').where('idCurso', id)
    const professor= await knex('professor').where('idProf', idUser).first(); 
    const videos= await knex('videoCurso').join('curso', 'curso.idCurso', 'videoCurso.idCurso').join('moduloCurso', 'moduloCurso.idModulo', 'videoCurso.idModulo').where('videoCurso.idCurso', id)
    const matriculas= await knex('matricula').join('curso', 'curso.idCurso', 'matricula.idCurso').join('aluno', 'aluno.idAluno', 'matricula.idAluno').where('curso.idCurso', id).where('estadoMatricula', 0)
    const curso= await knex('curso').join('categoria', 'curso.idCategoria', 'categoria.idCategoria').join('professor', 'curso.idProf', 'professor.idProf').where('idCurso', id).first();
    const categoria= await knex('categoria').select('*')
    if(professor && curso  && modulo && videos){
      resp.render('professor/Curso/definicoesCurso', { curso, matriculas, professor, modulo, videos, categoria});
    }else{
      resp.render('error/404')
    }       
  } catch (error) {
    console.log(error);
    resp.render('error/404')
  }   
})

//Perfil Adicionar Video
ProfessorController.get('/moduloAddVideo/:id/:idModulo',instrutorAuth,async (req:Request, resp: Response)=>{
  try {
    const idUser=req.session?.user.id;
    const {id, idModulo}=req.params;
    const modulo= await knex('moduloCurso').where('idModulo', idModulo).first()
    const professor= await knex('professor').where('idProf', idUser).first(); 
    const videos= await knex('videoCurso').join('curso', 'curso.idCurso', 'videoCurso.idCurso').join('moduloCurso', 'moduloCurso.idModulo', 'videoCurso.idModulo').where('videoCurso.idModulo', idModulo) 
    const matriculas= await knex('matricula').join('curso', 'curso.idCurso', 'matricula.idCurso').join('aluno', 'aluno.idAluno', 'matricula.idAluno').where('curso.idCurso', id)
    const curso= await knex('curso').join('categoria', 'curso.idCategoria', 'categoria.idCategoria').join('professor', 'curso.idProf', 'professor.idProf').where('idCurso', id).first();
    if(professor && curso  && modulo){
      resp.render('professor/Curso/moduloAddVideo', { curso, matriculas, professor, modulo, videos});
    }else{
      resp.render('error/404')
    }       
  } catch (error) {
    console.log(error);
    resp.render('error/404')
  }   
})
//Editar Modulo
ProfessorController.get('/editarModulo/:id/:idModulo',instrutorAuth,async (req:Request, resp: Response)=>{
  try {
    const idUser=req.session?.user.id;
    const {id, idModulo}=req.params;
    const modulo= await knex('moduloCurso').where('idModulo', idModulo).first()
    const professor= await knex('professor').where('idProf', idUser).first(); 
    const videos= await knex('videoCurso').join('curso', 'curso.idCurso', 'videoCurso.idCurso').join('moduloCurso', 'moduloCurso.idModulo', 'videoCurso.idModulo').where('videoCurso.idModulo', idModulo) 
    const matriculas= await knex('matricula').join('curso', 'curso.idCurso', 'matricula.idCurso').join('aluno', 'aluno.idAluno', 'matricula.idAluno').where('curso.idCurso', id)
    const curso= await knex('curso').join('categoria', 'curso.idCategoria', 'categoria.idCategoria').join('professor', 'curso.idProf', 'professor.idProf').where('idCurso', id).first();
    if(professor && curso  && modulo){
      resp.render('professor/Curso/editarModulo', { curso, matriculas, professor, modulo, videos});
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


