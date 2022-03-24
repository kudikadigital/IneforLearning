import knex from '../../database/conection';
import { Response, Request } from 'express';

class AdmController{

    async painelAdm(req:Request, resp: Response) {
      const professor= await knex('professor').select('*')
      const cursos= await knex('curso').select('*')
      const alunos= await knex('aluno').select('*')
        resp.render('admin/index', {adm:req.session?.adm, professor, cursos, alunos})
    }

}

export default AdmController;
//image, name, email, whatsaap, desc, nomeuser, senha

