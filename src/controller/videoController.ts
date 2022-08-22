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



export default VideoController;

//image, name, email, whatsaap, nomeuser senha


