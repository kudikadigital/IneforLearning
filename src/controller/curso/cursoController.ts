import knex from '../../database/conection';
import { Response, Request } from "express";

class CursoController{
    async criarCurso(req:Request, resp: Response){
        try {
            const { idProfessor, categoria ,descCurso,nomeCurso,data_inicio}= req.body;  
          
             
            const estadoCurso=1;
            const imageCurso= (req.file) ? req.file.filename : 'curso.jpg';
            console.log({ idProfessor, categoria ,descCurso,nomeCurso,data_inicio,imageCurso});
            const id=await knex('curso').insert({idProfessor, categoria ,descCurso,nomeCurso,estadoCurso, data_inicio,imageCurso});
            const ids=id[0]
            resp.redirect("/admin/cursos")
        } catch (error) {
            resp.send(error)
        }       
    }    
   async listarCurso(req:Request, resp:Response) {
    const cursos= await knex('curso').join('professor', 'curso.idProfessor', '=', 'professor.id').select('*')
    const alunos= await knex('aluno').select('*')
    resp.render("admin/cursos",{adm:req.session?.adm, cursos, alunos})
   }
   async criarCursoView(req:Request, resp:Response) {
    const professores= await knex('professor').whereNot('adm', 1)
    const categoria= await knex('categoria').select('*')
    console.log(categoria)
    resp.render("admin/cadastrarcursos",{adm:req.session?.adm, categoria, professores})
   }
}

export default CursoController;

//nome, idProfessor, data-inicio, data-fim, image, desc, estado

