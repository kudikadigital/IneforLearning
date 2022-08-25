import knex from '../database/conection';
import multerConfig from '../config/multer';
import multer from 'multer'
import { Response, Request, Router } from  "express";
import instrutorAuth from '../middlewre/professor'
import adminAuth from '../middlewre/adm'

const upload = multer(multerConfig);

const VideoController=Router();

VideoController.post('/adicionarVideo', upload.single('image'), instrutorAuth, async (req: Request, resp: Response) => {
  try {
    const { nomeVideo, descricaoVideo, idModulo, idCurso, srcVideo} = req.body;
   
    const bannerVideo = (req.file) ? req.file.filename : 'Sem Banner';
    
    if (!(nomeVideo === '' || descricaoVideo === '' || srcVideo === '')) {
              const verify = await knex('videoCurso').where('nomeVideo', nomeVideo).orWhere('srcVideo', srcVideo)
              if (verify.length === 0) {
                const curtidaVideo = 0
                const ids = await knex('videoCUrso').insert( { nomeVideo, descricaoVideo, idModulo, idCurso, srcVideo, bannerVideo, curtidaVideo})
                resp.json({ certo: 'Video adicionado com sucesso' })

              } else {
                resp.json({ error: 'Já existe um video vinculado a esses dados!' })
                //resp.redirect("/cadastrarCliente")

              }
        
    } else {
      resp.json({ error: "Ocorreu um problema!" })
    }
  } catch (error) {
    console.log(error);
    resp.json({ error: "Ocorreu um problema!" })
  }
}
)

VideoController.post('/verVideo', upload.single('image'), instrutorAuth, async (req: Request, resp: Response) => {
  try {
    const { idModulo, idVideo} = req.body;
    
    if (idModulo && idVideo) {
      const srcVideo= await knex('videoCurso').join('moduloCurso', 'moduloCurso.idModulo', 'videoCurso.idModulo').where('videoCurso.idModulo', parseInt(idModulo)).where('videoCurso.idVideo', parseInt(idVideo)).first(); 
      resp.json(srcVideo)
    } else {
      resp.json({ error: "Ocorreu um problema!" })
    }
  } catch (error) {
    console.log(error);
    resp.json({ error: "Ocorreu um problema1!" })
  }
}
)

VideoController.post('/editarVideo', upload.single('image'), instrutorAuth, async (req: Request, resp: Response) => {
  try {
    const { nomeVideo, descricaoVideo, idModulo, idCurso, srcVideo, idVideo} = req.body;
   
    const bannerVideo = (req.file) ? req.file.filename : 'Sem Banner';
    
    if (!(nomeVideo === '' || descricaoVideo === '' || srcVideo === '')) {
              const verify = await knex('videoCurso').where('nomeVideo', nomeVideo)
              const verify1 = await knex('videoCurso').where('srcVideo', srcVideo)
              if (verify.length === 0 || verify1.length === 0) {
                
                const ids = await knex('videoCUrso').update( { nomeVideo, descricaoVideo, srcVideo}).where('idVideo', idVideo)
                resp.json({ certo: 'Dados do Vídeo editado!' })

              } else {
                resp.json({ error: 'Já existe um video vinculado a esses dados!' })
                //resp.redirect("/cadastrarCliente")
              }
        
    } else {
      resp.json({ error: "Ocorreu um problema!" })
    }
  } catch (error) {
    console.log(error);
    resp.json({ error: "Ocorreu um problema!" })
  }
}
)





export default VideoController;

//image, name, email, whatsaap, nomeuser senha        const srcVideo= await knex('cursoVideo').join('moduloCurso', 'moduloCurso.idModulo', 'videoCurso.idModulo').where('idModulo', idModulo).where('idVideo', idVideo).first();
     


