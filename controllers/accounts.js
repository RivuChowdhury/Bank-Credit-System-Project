const con=require('../database');
const path=require('path');
function handleUserSignUp(req,res){
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
}

function handleUserLogin(req,res){
    var name = req.body.logname;
    var pass = req.body.logpsw;
    var sql1 = "SELECT * FROM bank WHERE Customer_name LIKE '%" + name + "%' AND passkey LIKE '%" + pass + "%'";
    var sql2 = "SELECT bank.Customer_id, bank.Customer_name, loans.Loan_id, loans.loan_type, loans.Principal_mount, loans.Interest, loans.Time_period, loans.Total_amount, bank.email, bank.mobile FROM bank RIGHT JOIN loans ON bank.customer_id = loans.customer_id WHERE loans.Customer_name LIKE '%" + name + "%';"
    con.query(sql1, (err, result1) => {
        if (err) throw err;
        con.query(sql2, (err, result2) => {
            if (err) throw err;
            // Passing customer and loans objects separately
            res.render(path.join(__dirname, '../views/search-customer'), { customer: result1, loans: result2 });
        })
    })
}

module.exports={
    handleUserSignUp,
    handleUserLogin,
}
