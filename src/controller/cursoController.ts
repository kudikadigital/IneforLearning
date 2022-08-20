import knex from '../database/conection';
import multerConfig from '../config/multer';
import multer from 'multer'
import { Response, Request, Router } from  "express";
import adminAuth from '../middlewre/adm'

const upload = multer(multerConfig);

const CursoController=Router();
//Papel do Admin


CursoController.post('/novoCurso',upload.single('image'), async (req:Request, resp: Response)=> {
  const {nomeCurso, idProf,aprendizadoCurso, descricaoCurso, precoCurso, cargaHoraria,descricaoCurso1, idCategoria}=req.body;  
  const imgCurso=(req.file)?req.file.filename : 'user.png';
  const estadoCurso=0;
  const curtidaCurso=0;
  if(!nomeCurso.match(/\b[A-Za-zÀ-ú][A-Za-zÀ-ú]+,?\s[A-Za-zÀ-ú][A-Za-zÀ-ú]{2,19}\b/gi)){
    resp.json({error:'Erro ao escrever o nome!'})
  }else if(imgCurso=='user.png'){
    resp.json({error:'Coloque uma foto de perfil para o Curso'})
  }else if(descricaoCurso.length<30){
    resp.json({error:'Precisa de mais Descrição'})
  }else if(!precoCurso || precoCurso<2000){
    resp.json({error:'Curso não pode ter preço inferior a 2000 Kwanzas'})
  }else if(descricaoCurso1.length<10){
    resp.json({error:'Precisa de mais breve descrição promocional'})
  }else if(cargaHoraria.length==0 || cargaHoraria.length<=1){
    resp.json({error:'Especifica melhor a carga Horária'})
  }else if(aprendizadoCurso.length<30){
    resp.json({error:'Precisa de mais Descrição Sobre o que se vai aprender no Curso'})
  }
  else{
    const verfication= await knex('curso').where('idProf', idProf).andWhere('nomeCurso', nomeCurso).andWhere('idCategoria', idCategoria);
    if(verfication.length > 0){
      resp.json({error:'Já existe um curso desse Genero'})
    }else{
      const curso = await knex('curso').insert({nomeCurso,arquivoCurso:'',aprendizadoCurso, idProf,descricaoCurso1, imgCurso, descricaoCurso, precoCurso, estadoCurso, curtidaCurso, cargaHoraria, idCategoria})
      resp.json({certo:'Curso Cadastrado com sucesso!'})
    }
  }
})
CursoController.get('/listarCursos',upload.single('image'), async (req:Request, resp: Response)=> {
  const cursos= await knex('curso').select('*');
  resp.json(cursos)
})
CursoController.get('/aceitarCurso/:id/:idCoord', async (req:Request, resp: Response)=> {
  const {id, idCoord}= req.params
  const curso= await knex('curso').update({estadoCurso:1, idCoordenador:idCoord}).where('idCurso', id);
  const cursoEsp=await knex('curso').join('professor', 'curso.idProf', 'professor.idProf').where('idCurso', id).first();
  const coordenador= await knex('coordenador').where('idCoordenador', idCoord).first();
  const tipoActividade=`Aceitar Curso`;
  const descActividadeCoordenador=`Coordenador ${coordenador.nomeCoordenador} Validou o Curso ${cursoEsp.nomeCurso} de ${cursoEsp.nomeProf}`
  const actividadeCoordenador= await knex('actividadeCoordenador').insert({tipoActividade,descActividadeCoordenador, idCoordenador:coordenador.idCoordenador })
  req.flash('certo', 'Curso validado com sucesso!')
  resp.redirect('/estadoCurso/'+id)
})

CursoController.get('/desativarCurso/:id/:idCoord', async (req:Request, resp: Response)=> {
  const {id, idCoord}= req.params
  const curso= await knex('curso').update({estadoCurso:0, idCoordenador:idCoord}).where('idCurso', id);
  const cursoEsp=await knex('curso').join('professor', 'curso.idProf', 'professor.idProf').where('idCurso', id).first();
  const coordenador= await knex('coordenador').where('idCoordenador', idCoord).first();
  const tipoActividade=`Desactivar Curso`;
  const descActividadeCoordenador=`Coordenador ${coordenador.nomeCoordenador} Desactivou o Curso ${cursoEsp.nomeCurso} de ${cursoEsp.nomeProf}`
  const actividadeCoordenador= await knex('actividadeCoordenador').insert({tipoActividade,descActividadeCoordenador, idCoordenador:coordenador.idCoordenador })
  req.flash('certo', 'Curso desactivado!')
  resp.redirect('/estadoCurso/'+id)
})
export default CursoController;

//image, name, email, whatsaap, nomeuser senha


