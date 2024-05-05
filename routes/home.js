const express=require("express");
const router=express.Router();
const path=require('path');
const {handleUserSignUp,handleUserLogin}=require('../controllers/accounts')
const {handleLoans}=require('../controllers/loans');

router.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'../views/index.html'));
})

router.post('/',handleUserSignUp);

router.get('/search',handleUserLogin);

router.get('/loan',(req,res)=>{
    res.sendFile(path.join(__dirname,'../views/loanform.html'));
})

router.post('/loan',handleLoans)

module.exports=router;