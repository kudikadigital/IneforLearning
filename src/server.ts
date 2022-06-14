import express from "express";
import route from './Routes'
import cors from 'cors';
import path from 'path';
import bodyParser from "body-parser";
import session from 'express-session'


const app= express();

app.use(session({
    secret:'ineforLearning',
    cookie:{maxAge: 3000000000}
}))

app.use('/upload', express.static(path.resolve(__dirname, '..','upload')) );
app.use(express.static(path.resolve(__dirname, '..','public')))
app.set('view engine', 'ejs')
app.use(cors());

app.use(route);
app.use(bodyParser.json())
app.use(bodyParser.urlencoded( { extended: false}))


app.listen(1200, () => {
    console.log('Created');
})