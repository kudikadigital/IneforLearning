import {Router, Request, Response} from 'express';
import CursoController from './controller/cursoController';
const Route= Router ();
import ProfessorContrller from './controller/professorController';
import AlunoController from './controller/alunoController';
import alunoCursoController from './controller/alunoCursoController';
import servicoController from './controller/servicoController';
const ProfessorC = new ProfessorContrller();
const CursoC = new CursoController();
const AlunoC = new AlunoController();
const aluno_curso= new alunoCursoController();
const ServicoC= new servicoController();
import bodyParser from "body-parser";
var urlencodedParser = bodyParser.urlencoded({ extended: false })

import {alunoAuth} from './middlewre/aluno'

Route.post('/criarProfessor', ProfessorC.criarProfessor )
Route.get('/listarProfessor', ProfessorC.listarProfessor)

Route.post('/criarCurso',CursoC.criarCurso)
Route.get('/listarCurso', CursoC.listarCurso )
Route.get('/listarAluno', AlunoC.listarAluno)
Route.post('/criarAluno',urlencodedParser,AlunoC.criarAluno)
Route.post('/login',urlencodedParser,AlunoC.loginAluno)

Route.post('/alunoCurso', aluno_curso.inscrever);
Route.post('/criarServico', ServicoC.criarServico)
Route.get('/listarServico', ServicoC.listarServico)


//Rotas Aluno
Route.get('/AlunoPainel',alunoAuth, AlunoC.alunoPainel)



//General Routes
Route.get('/', (req:Request, resp:Response)=>{
    resp.render('login')
})
Route.get('/home', (req:Request, resp:Response)=>{
    resp.render('Home')
})


export default Route;