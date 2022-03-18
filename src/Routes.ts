import {Router, Request, Response} from 'express';
import CursoController from './controller/curso/cursoController';
const Route= Router ();
import ProfessorContrller from './controller/instrutor/professorController';
import AlunoController from './controller/aluno/alunoController';
import alunoCursoController from './controller/aluno_curso/alunoCursoController';
import { authenticate } from './config/loginService';

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
Route.get('/AlunoPainel',alunoAuth, AlunoC.alunoPainel) // Painel do Aluno

//Rotas Aluno Cursos
Route.post('/alunoCurso', aluno_curso.inscrever); // Matricular-se a um curso



//  Rotas Gerais do Sistema
//Login principal
Route.get('/login', (req:Request, resp: Response)=>{
    resp.render('login')
})
// Home page do Sistema
Route.get('/', (req:Request, resp: Response)=>{
    resp.render('home')
})



//LOGIN GERAL DO SISTEMA
Route.post('/loginGeral',urlencodedParser, (req:Request, resp: Response)=>{
    try {
        const {email, senha}= req.body;
        authenticate(email, senha).then(r=>{
            if(r==='-1'){
                resp.send('Não existe uma conta')
            }else{
                const dados=r;
                if(dados){
                     if(dados.p==='professor'){
                        resp.send('Professor Normal')
                     }else if(dados.p==='adm'){
                        resp.send('Admistrador Principal')
                     }else if(dados.p==='aluno'){
                        const aluno= dados
                        if(req.session){
                          req.session.aluno=aluno;
                          resp.redirect('AlunoPainel')
                        } 
                    }
                }
            }
        })   
    } catch (error) {
        console.log(error)
    }
})

export default Route;