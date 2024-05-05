const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const path=require('path');
const mainrouter=require('./routes/home')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));

app.set('view engine','ejs');

app.use('/',mainrouter);

app.listen(3000);