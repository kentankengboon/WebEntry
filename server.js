/*
var express = require('express');
var app = express();

app.get('/', function (req, res) {
   
    var sql = require("mssql");

    // config for your database
    var config = {
        user: 'rlogic',
        password: 'cr3m3workz',
        server: 'localhost', 
        // server: '10.2.50.40', 
        database: 'mps_staging' 
    };

    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query('select * from Student', function (err, recordset) {
            
            if (err) console.log(err)

            // send records as a response
            res.send(recordset);
            
        });
    });
});

var server = app.listen(5000, function () {
    console.log('Server is running..');
});
*/

// another example
/*
const express = require('express');
const sql = require('mssql');
const PORT = 3001;

const app = express();

const sqlconfig = {
    user: 'sa',
    password: 'sercure*L1',
    server: 'localhost',
    database: 'sfvote'
};

app.get('/',function(req,res){
    let connection = sql.connect(sqlconfig,(err)=>{
        if(err){
            console.log(err)
        }else {
            res.send('DB Connected');
        }
    })
})

app.listen(PORT,function(){
    console.log(`Server started at ${PORT}`)
})

*/

var express = require('express');
var app = express();

app.get('/', function (req, res) {
   
    var sql = require("mssql");

    // config for your database
    var config = {
        user: 'rlogic',
        password: 'cr3m3workz',
        // server: 'localhost', 
        server: '10.2.50.40', 
        database: 'mps_staging' 
    };

    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query("INSERT INTO TempEmptable (Sn, EmpCode, Empname, Remarks) VALUES ('SN1234', 'Emp1234', 'Kelvin','customer service')", function (err, recordset) {
            
            if (err) console.log(err)

            // send records as a response
            res.send(recordset);
            
        });
    });
});

var server = app.listen(5000, function () {
    console.log('Server is running..');
});

// from web to be inserted
/*
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO TempEmptable (Sn, EmpCode, Empname, Remarks) VALUES ('SN1234', 'Emp1234', 'Kelvin','customer service')";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
  });
  */