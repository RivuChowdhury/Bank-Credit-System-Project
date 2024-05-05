const con=require('../database');
//const path=require('path');
function handleLoans(req,res){
    var customer_id=req.body.uid;
    var name=req.body.uname;    
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
}

module.exports={
    handleLoans,
}