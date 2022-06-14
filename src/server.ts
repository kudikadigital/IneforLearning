import express from "express";
import route from './Routes'
import cors from 'cors';
import path from 'path';
import bodyParser from "body-parser";
import flash from 'express-flash'
import session from 'express-session'
import admController from './controller/admController';
import alunoController from './controller/alunoController';
import professorController from './controller/professorController';
import knex from './database/conection';
import cron  from 'node-cron'


const app= express();
app.use(flash())

app.use(session({
    secret:'ineforLearning',
    cookie:{maxAge: 3000000000}
}))

app.use('/upload', express.static(path.resolve(__dirname, '..','upload')) );
app.use(express.static(path.resolve(__dirname, '..','public')))
app.set('view engine', 'ejs')
app.use(cors());


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(route);
app.use(alunoController);
app.use(professorController);
app.use(admController);

app.use(async(req,res, next)=>{ 
    
    res.render("Site/404")
}) 



app.listen(1200, () => {
    
   // cron.schedule('* * * * * *', async () => {
    //    const marcacao = await knex('marcacao').where('dataMarcacao', '<=',dataAtual).andWhere('hora','>',horatual).update({estadoMarcacao:'2'});
    //  });
    console.log('Created');
})