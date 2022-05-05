import {Router, Request, Response} from 'express';
const Route= Router ();
import CursoController from './controller/curso/cursoController';
import ProfessorContrller from './controller/instrutor/professorController';
import AlunoController from './controller/aluno/alunoController';
import alunoCursoController from './controller/aluno_curso/alunoCursoController';
import { authenticate } from './config/loginService';
import AdmController from './controller/adm/admController';
import multerConfig from './config/multer';
import multer from 'multer';

const upload = multer(multerConfig);

//Instancia dos Controller
const ProfessorC = new ProfessorContrller();
const CursoC = new CursoController();
const AlunoC = new AlunoController();
const aluno_curso= new alunoCursoController();
const admC= new AdmController(); 


//Body-parser para adicionar e obter dados a partir das rotas
import bodyParser from "body-parser";
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//Middlewares
import {alunoAuth} from './middlewre/aluno' //Aluno
import {admAuth} from './middlewre/adm'
import {profAuth} from './middlewre/professor'

//Rotas Professor
Route.post('/criarProfessor', ProfessorC.criarProfessor ) //Cadastrar Professor
Route.get('/listarProfessor', ProfessorC.listarProfessor) //Listar Professor
Route.get('/professor', ProfessorC.profView) //Listar Professor
Route.get('/professor/cursos', ProfessorC.profCursos) //Listar Professor
Route.get('/professor/notificacao', ProfessorC.profCursosNotificacao) //Listar Professor


//Rotas Cursos 
Route.post('/criarCurso',CursoC.criarCurso) // Criar Cursos
Route.get('/listarCurso', CursoC.listarCurso ) //Listar Curos

//Rotas adm 
Route.get('/admin',admAuth, admC.painelAdm)
Route.get('/admin/alunos', admAuth, AlunoC.listarAluno) //Listar Alluno´
Route.get('/admin/alunos/new', admAuth, AlunoC.criarAlunoView) //Listar Alluno
Route.post('/admin/alunos/create', admAuth,upload.single('image'),urlencodedParser, AlunoC.criarAluno)

//Route.get('/admin/aluno/new', adm, admC.aluno)
Route.get('/admin/cursos', admAuth, CursoC.listarCurso)
Route.get('/admin/cursos/new', admAuth, CursoC.criarCursoView)
Route.post('/admin/cursos/create', admAuth,upload.single('imageCurso'),urlencodedParser, CursoC.criarCurso)
Route.get('/admin/instrutores', admAuth, ProfessorC.listarProfessor)
Route.get('/admin/instrutores/new', admAuth, ProfessorC.criarProfView)
Route.post('/admin/instrutores/create', admAuth,upload.single('image'),urlencodedParser, ProfessorC.criarProfessor)
//Route.post('/admin/instrutores/new', admAuth, ProfessorC.instrutorNew)

//o curso 
Route.get('/admin/ocurso', admAuth, CursoC.ocurso)


//Rotas Aluno
Route.get('/listarAluno', alunoAuth, AlunoC.listarAluno) //Listar Alluno
Route.post('/criarAluno',urlencodedParser,AlunoC.criarAluno) // Cadastrar Aluno
Route.get('/aluno',alunoAuth, AlunoC.alunoPainel) // Painel do Aluno
//new add
//Route.get('/aluno/cursos/emandamento',alunoAuth, AlunoC.alunocursos) // Painel do Aluno
//Route.get('/aluno/cursos/terminados',alunoAuth, AlunoC.alunocursos) // Painel do Aluno
Route.get('/aluno/cursosemandamento',alunoAuth, AlunoC.alunocursos) // Painel do Aluno
Route.get('/aluno/cursosterminados',alunoAuth, AlunoC.alunoCursosTerminados) // Painel do Aluno

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
                        const professor= dados
                        if(req.session){
                          req.session.professor=professor;
                          resp.redirect('/instrutor')
                        }      
                     }else if(dados.p==='adm'){
                        const adm= dados
                        if(req.session){
                          req.session.adm=adm;
                          //console.log(adm)
                          resp.redirect('/admin')
                        } 
                     }else if(dados.p==='aluno'){
                        const aluno= dados
                        if(req.session){
                          req.session.aluno=aluno;
                          resp.redirect('/aluno')
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