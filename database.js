var mysql=require("mysql");

var connection=mysql.createPool({
    host:'localhost',
    database:'bankdb',
    user:'root',
    password:'12345',
    multipleStatements: true
});

module.exports=connection;