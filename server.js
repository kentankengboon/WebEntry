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


/*
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

*/


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


  // Srinivas' code
var Connection = require('tedious').Connection;  
var config = {  
    server: '10.2.50.40',  //update me
    authentication: {
        type: 'default',
        options: {
            userName: 'rlogic', //update me
            password: 'cr3m3workz'  //update me
        }
    },
    options: {
        // If you are on Microsoft Azure, you need encryption:
        encrypt: false,
        database: 'mps_staging'  //update me
    }
}; 
var connection = new Connection(config);  
connection.on('connect', function(err) {  
    // If no error, then good to proceed.  
    console.log("Connected");  
    executeStatement();  
});  

connection.connect();

var Request = require('tedious').Request;  
var TYPES = require('tedious').TYPES;  

function executeStatement() {  
    request = new Request("select top 5 * from indent order by indentid desc;", function(err) {  
    if (err) {  
        console.log(err);}  
    });  
    var result = "";  
    request.on('row', function(columns) {  
        columns.forEach(function(column) {  
          if (column.value === null) {  
            console.log('NULL');  
          } else {  
            result+= column.value + " ";  
          }  
        });  
        console.log(result);  
        result ="";  
    });  

    request.on('done', function(rowCount, more) {  
    console.log(rowCount + ' rows returned');  
    });  
    
    // Close the connection after the final event emitted by the request, after the callback passes
    request.on("requestCompleted", function (rowCount, more) {
        connection.close();
    });
    connection.execSql(request);  
}  