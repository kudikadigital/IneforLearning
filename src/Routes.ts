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
import knex from './database/conection'

const upload = multer(multerConfig);



//  Rotas Gerais do Sistema
//Login principal
Route.get('/login', (req:Request, resp: Response)=>{
    resp.render('site/login', {certo:req.flash('certo'), errado:req.flash('errado')});
})

Route.get('/logout', (req:Request, resp: Response)=>{
 
  if(req.session){
    req.session.user={}; 
    resp.redirect('/')  
  }  
  
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
        console.log(error);
        resp.render('error/404')
    }
})




Route.post('/cadastro',async(req:Request, resp: Response)=>{
    try {
        const {nome, username, email,tell,senha,senha1,tipo}=req.body; 
        const estadoCliente = 1;
        const role= 2;
        if(!(nome===''|| username===''|| email===''||tell===''||senha===''||senha1===''||tipo==='')){
            const imgCliente= (req.file) ? req.file.filename : 'user.png';
            let re = /[A-Z]/;
            const hasUpper = re.test(username);
            const verificaEspaco = /\s/g.test(username);
            const Mailer = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/.test(email);
            const number = /^[9]{1}[0-9]{8}$/.test(tell)
           if (hasUpper === true) {
                    req.flash('errado', "Username não Aceite");
                    resp.redirect('/login')
                  // resp.redirect("/cadastrarCliente") 
                 } else if (verificaEspaco === true) {
                    req.flash('errado', "Username não Aceite");
                    resp.redirect('/login')
                  
                  // resp.redirect("/cadastrarCliente")
           
                 } else
                    if (!Mailer) {
                       req.flash('errado', "Email Incorreto");
                       resp.redirect('/login')
                  // resp.redirect("/cadastrarCliente")
                    } else
                       if (senha.length < 5) {
                          req.flash('errado', "Senha muito fraca");
                          resp.redirect('/login')
                  // resp.redirect("/cadastrarCliente")
                       } else
                          if (senha != senha1) {
                             req.flash('errado', "Senha Diferentes");
                             resp.redirect('/login')
                  // resp.redirect("/cadastrarCliente")
           
                          } else if(number == false) {
                             req.flash('errado', "Numero de tellefone incorreto");
                             resp.redirect('/login')
                  // resp.redirect("/cadastrarCliente")
              
                          }else{ 
                             if(tipo=='aluno'){
                                console.log(email, username);
                                
                                const verify= await knex('aluno').where('emailAluno', email).orWhere('userAluno', username).orWhere('telAluno', tell)
                                if(verify.length===0){
                                const enderecoAluno= 'Luanda, Luanda'
                                  const ids = await knex('aluno')
                                  .insert({imgAluno:imgCliente, nomeAluno:nome,telAluno:tell, userAluno:username, emailAluno:email,estadoAluno:1, senhaAluno:senha, enderecoAluno})
                                  req.flash("certo","Aluno cadastrado com sucesso!")
                                  resp.redirect("/login")
                                 // resp.redirect("/loginGeral")
                                }else{
                                  req.flash("errado","Este Aluno já esta cadastrado!")
                                  resp.redirect("/login")
                                  //resp.redirect("/cadastrarCliente")
                                
                                }
                             }else{
                                const verify= await knex('professor').where('emailProf', email).orWhere('userProf', username).orWhere('telProf', tell)
                                if(verify.length===0){
                                const enderecoProf= 'Luanda, Luanda';
                                const descricaoProf='Instrutor da Plataforma'
                                const d=new Date();
                                const dataProf=d.getDate(); 
                                const NIFProf='Sem NIF'
                                  const ids = await knex('professor')
                                  .insert({imgProf:imgCliente, nomeProf:nome,telProf:tell, userProf:username, emailProf:email,estadoProf:1, senhaProf:senha, enderecoProf, admProf:0, descricaoProf, NIFProf, dataProf})
                            
                                  req.flash("certo","Formador cadastrado com sucesso!")
                                  resp.redirect("/login")
                                 // resp.redirect("/loginGeral")
                                }else{
                                  req.flash("errado","Formador já esta cadastrado!")
                                  resp.redirect("/login")
                                  //resp.redirect("/cadastrarCliente")
                                
                                }
                             }
                          
                          }
           
           }else{
            req.flash("errado","Ocorreu um problema!")
             resp.redirect('/login')
                  // resp.redirect("/cadastrarCliente")
          
           } 
    } catch (error) {
        console.log(error);
        
        req.flash("errado","Ocorreu um problema!")
        resp.redirect('/login')    
    }

                     
  })

export default Route;