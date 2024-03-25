var express=require('express');
var app=express();
var con=require('./database');
var bodyParser=require('body-parser');
var path=require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));

app.set('view engine','ejs');

app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
})

app.post('/',function(req,res){

    var name=req.body.uname;
    var pass=req.body.psw;
    var email=req.body.uemail;
    var mobile=req.body.umobile;
    //con.connect(function(err){
        //if(err) throw err;
        
        var sql="INSERT INTO bank(Customer_name,passkey,email,mobile) VALUES ? ";
        var values=[
            [name,pass,email,mobile]
        ];
        
        con.query(sql,[values],function(err,result){
            if(err) throw err;
            //res.redirect('/students');
            res.send("Bank Account Created Successfully"+result.insertId);
        })


    //})
})


app.get('/search',function(req,res){
    var name=req.query.logname;
    var pass=req.query.logpsw;
    //res.send(pass);
    var sql1="SELECT* FROM bank WHERE Customer_name LIKE '%"+name+"%'  AND passkey LIKE '%"+pass+"%' ";
    /*con.query(sql1,function(err,result){
        if(err) throw err;
        res.render(__dirname+'/search-customer',{customer:result})
    })*/
    var sql2="SELECT bank.Customer_id,bank.Customer_name,loans.Loan_id,loans.loan_type,loans.Principal_mount,loans.Interest,loans.Time_period,loans.Total_amount,bank.email,bank.mobile FROM bank RIGHT JOIN loans ON bank.customer_id=loans.customer_id WHERE loans.Customer_name LIKE '%"+name+"%';"
    con.query(sql1,function(err,result1){
        if(err) throw err;
        con.query(sql2,function(err,result2){
            if (err) throw err;
            res.render(__dirname+'/search-customer',{customer:result1, loans:result2})
        })      
    })
    //res.send("Hello World");
})

app.get('/loan',function(req,res){
    res.sendFile(__dirname+'/loanform.html');
})

app.post('/loan',function(req,res){
    var customer_id=req.body.uid;
    var name=req.body.uname;
    //var pass=req.body.psw;    
    var loan=req.body.uloan;
    var amount=req.body.uamount;
    if(loan=="Home loan")
    {
        var interest=(10/100)*(amount);
    }
    else if(loan=="Gold loan")
    {
        var interest=(12/100)*(amount);
    }
    else if(loan=="Education loan")
    {
        var interest=(8/100)*(amount);
    }
    else if(loan=="Car loan")
    {
        var interest=(15/100)*(amount);
    }
    else if(loan=="Personal loan")
    {
        var interest=(14/100)*(amount);
    }
    else if(loan=="Business loan")
    {
        var interest=(18/100)*(amount);
    }
    
    var time=req.body.utime;
    var total=(amount)-(-interest);
    var email=req.body.uemail;
    var mobile=req.body.umobile;

    var sql="INSERT INTO loans(Customer_id,Customer_name,loan_type,Principal_mount,Interest,Time_Period,Total_amount,email,mobile) VALUES ? ";
    var values=[
        [customer_id,name,loan,amount,interest,time,total,email,mobile]
    ];
        
    con.query(sql,[values],function(err,result){
        if(err) throw err;
        res.send("Loan Sanctioned Successfully"+result.insertId);
        //res.redirect('/search')
    })
})



app.listen(3000);