import {Router, Request, Response} from 'express';
import CursoController from './controller/aluno_curso/cursoController';
const Route= Router ();
import ProfessorContrller from './controller/instrutor/professorController';
import AlunoController from './controller/aluno/alunoController';
import alunoCursoController from './controller/aluno_curso/alunoCursoController';

//Instancia dos Controller
const ProfessorC = new ProfessorContrller();
const CursoC = new CursoController();
const AlunoC = new AlunoController();
const aluno_curso= new alunoCursoController();

//Body-parser para adicionar e obter dados apartir das rotas
import bodyParser from "body-parser";
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//Middlewares
import {alunoAuth} from './middlewre/aluno' //Aluno


//Rotas Professor
Route.post('/criarProfessor', ProfessorC.criarProfessor ) //Cadastrar Professor
Route.get('/listarProfessor', ProfessorC.listarProfessor) //Listar Professor


//Rotas Cursos
Route.post('/criarCurso',CursoC.criarCurso) // Criar Cursos
Route.get('/listarCurso', CursoC.listarCurso ) //Listar Curos



//Rotas Aluno
Route.get('/listarAluno', AlunoC.listarAluno) //Listar Alluno
Route.post('/criarAluno',urlencodedParser,AlunoC.criarAluno) // Cadastrar Aluno
Route.post('/login',urlencodedParser,AlunoC.loginAluno) // Login Aluno
Route.get('/AlunoPainel',alunoAuth, AlunoC.alunoPainel) // Painel do Aluno

//Rotas Aluno Cursos
Route.post('/alunoCurso', aluno_curso.inscrever); // Matricular-se a um curso



//  Rotas Gerais do Sistema
//Login principal
Route.get('/', (req:Request, resp:Response)=>{
    resp.render('index')
})
// Home page do Sistema
Route.get('/home', (req:Request, resp:Response)=>{
    resp.render('Home')
})


export default Route;