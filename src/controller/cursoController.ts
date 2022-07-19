import knex from '../database/conection';
import multerConfig from '../config/multer';
import multer from 'multer'
import { Response, Request, Router } from  "express";
import adminAuth from '../middlewre/adm'

const upload = multer(multerConfig);

const CursoController=Router();
//Papel do Admin
CursoController.post('/cadastarMedico',upload.single('image'),async (req:Request, resp: Response)=>{
      try {
        const imagemMedico= (req.file) ? req.file.filename : 'user.png';       
        const {nomeMedico, userMedico, emailMedico, tellMedico, passMedico, idEspecialidade,generoMedico, descMedico, passMedico2}= req.body;         
        if(nomeMedico=='' || userMedico=='' || emailMedico=='' || tellMedico=='' || passMedico=='' || idEspecialidade=='' || generoMedico=='' || descMedico=='' || passMedico2==''){
          req.flash('errado', 'Valores incorretos');
          resp.redirect('/FormMedico')
        }else{
          let re = /[A-Z]/;
          const hasUpper = re.test(userMedico);
          const verificaEspaco = /\s/g.test(userMedico);
          const Mailer = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/.test(emailMedico);
          const number = /^[9]{1}[0-9]{8}$/.test(tellMedico)
          if (hasUpper === true) {
            req.flash('errado', "Ocorreu um problema");
          resp.redirect('/FormMedico')
       
   
         } else if (verificaEspaco === true) {
            req.flash('errado', "nao cadastrado 2");
          resp.redirect('/FormMedico')
   
         } else
            if (!Mailer) {
               req.flash('errado', "nao cadastrado 3");
             resp.redirect('/FormMedico')
            } else
               if (passMedico.length < 5) {
                  req.flash('errado', "Senha muito fraca");
                resp.redirect('/FormMedico')
               } else
                  if (passMedico != passMedico2) {
                     req.flash('errado', "Senha Diferentes");
                   resp.redirect('/FormMedico')
   
                  } else if(number == false) {
                     req.flash('errado', "Numero de Telefone incorreto");
                   resp.redirect('/FormMedico')
      
                  }else{ 
          const medico= await knex('medico').where('userMedico',userMedico).orWhere('tellMedico',tellMedico).orWhere('passMedico',emailMedico)
          if(medico.length>0){
            
            req.flash('errado', 'Esses dados Ja encontra-se presente ');
            resp.redirect('/FormMedico')
          }else{
            const medito= await knex('medico').insert({role:0, nomeMedico, userMedico, emailMedico, tellMedico, passMedico, idEspecialidade,generoMedico,imagemMedico, descMedico})
            req.flash('certo', 'Medico Cadastrato com Sucesso');
            resp.redirect('/listarMedico')
           
          }
        }
      }
       
      } catch (error) {
        resp.send(error + " - falha ao registar")
      }
    }    
)

CursoController.post('/novoCurso',upload.single('image'), async (req:Request, resp: Response)=> {
  const {nomeCurso, idProf,aprendizadoCurso, descricaoCurso, precoCurso, cargaHoraria, idCategoria}=req.body;
  const imgCurso=(req.file)?req.file.filename : 'user.png';
  const estadoCurso=0;
  const curtidaCurso=0;
  if(!nomeCurso.match(/\b[A-Za-zÀ-ú][A-Za-zÀ-ú]+,?\s[A-Za-zÀ-ú][A-Za-zÀ-ú]{2,19}\b/gi)){
    resp.json({error:'Erro ao escrever o nome!'})
  }else{
    const verfication= await knex('curso').where('idProf', idProf).andWhere('nomeCurso', nomeCurso);
    if(verfication.length > 0){
      resp.json({error:'Já existe um curso desse Genero'})
    }else{
      const curso = await knex('curso').insert({nomeCurso,arquivoCurso:'',aprendizadoCurso, idProf, imgCurso, descricaoCurso, precoCurso, estadoCurso, curtidaCurso, cargaHoraria, idCategoria})
      resp.json('Curso Cadastrado com sucesso!')
    }
  }
})
CursoController.get('/listarCursos',upload.single('image'), async (req:Request, resp: Response)=> {
  const cursos= await knex('curso').select('*');
  resp.json(cursos)
})

export default CursoController;

//image, name, email, whatsaap, nomeuser senha


