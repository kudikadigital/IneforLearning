import {Router, Request, Response} from 'express';
const Route= Router ();
import CursoController from './controller/cursoController';
import ProfessorContrller from './controller/professorController';
import AlunoController from './controller/alunoController';
import alunoCursoController from './controller/alunoCursoController';
import { authenticate } from './config/loginService';
import AdmController from './controller/admController';
import multerConfig from './config/multer';
import multer from 'multer';

const upload = multer(multerConfig);





//  Rotas Gerais do Sistema
//Login principal
Route.get('/login', (req:Request, resp: Response)=>{
    resp.render('site/login', {certo:req.flash('certo'), errado:req.flash('errado')});
})
// Home page do Sistema
Route.get('/', (req:Request, resp: Response)=>{
    resp.render('site/home')
})


//LOGIN GERAL DO SISTEMA
Route.post('/loginGeral', (req:Request, resp: Response)=>{
    try {
        const {email, senha}= req.body;
        authenticate(email, senha).then(r=>{
            if(r==='-1'){
                req.flash('errado', "Não exite uma conta vinculada");
                resp.redirect('/login')
            }else{
                const dados=r;
                if(dados){
                     if(dados.p==='professor'){ 
                        const professor= dados
                        if(req.session){
                          req.session.user={id:professor.dados.idProf, role:professor.dados.admProf};
                          resp.redirect('/instrutor')
                        }      
                     }else if(dados.p==='adm'){
                        const adm= dados
                        if(req.session){
                            req.session.user={id:adm.dados.idProf, role:adm.dados.admProf};
                          console.log(req.session.user)
                          resp.redirect('/admin')
                        } 
                     }else if(dados.p==='aluno'){
                        const aluno= dados
                        if(req.session){
                            req.session.user={id:aluno.dados.idAluno, role:2};
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