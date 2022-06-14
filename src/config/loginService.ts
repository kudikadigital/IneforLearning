//import jwt  from 'jsonwebtoken';
import knex from '../database/conection';


async function authenticate(email:string, senha:string) {
    try {
        const aluno=await knex('aluno').where('emailAluno', email).where('senhaAluno', senha);
        if(aluno.length!==0){
            const dados= aluno[0]
            return {dados, p:'aluno'}
        }else if(aluno.length===0){
            const professor= await knex('professor').where('emailProf', email).where('senhaProf',senha );
            if(professor.length!==0){
                const dados= professor[0];
                if(dados.admProf===1){
                    const PROFESSORAdm= {dados, p:'adm'}
                    return PROFESSORAdm;
                }else if(dados.admProf===0){
                    const PROFESSOR= {dados, p:'professor'}
                    return PROFESSOR;
                }
            }else{ 
                return '-1'  
            }
        }else{
            return '-1'
        }
    } catch (error) {
        console.log(error)
    }

}

export {authenticate};
