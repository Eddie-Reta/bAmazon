//npm installed packages for this app to work
const mysql = require('mysql');
const inquirer = require('inquirer');
const { table } = require("table");

var connection = mysql.createConnection({
    host: "localhost",
  // port to connect to
port : 3306,

// mysql username to be used in the connection 
user:"root",

// password for the connection
password: "Spiderman.3",

//database within mysql workbench 
database: "bamazon"
});

connection.connect( function(err){
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
   start();
});

function items(){
    console.log("Here is the list of the items for purchase!")
    var query = "SELECT * FROM products";
    connection.query(query, function(err, res) {
              if (err) throw err;
        for (var i = 0; i < res.length; i++){
            console.log(res[i].item_id.toString() + " |-----PRODUCT-----|  " + res[i].product_name +  "\n |-----DEPARTMENT-----|  "+ res[i].department_name + "\n |-----PRICE-----|  " + res[i].price + "\n |-----AVIALABLE-----|  " + res[i].stock_quantity)
        }
        console.log('----------------------');
      });
    }


function start(){
     inquirer
         .prompt([
             {
             name: "question",
             type: "list",
             message: "Would you like to buy a product?",
             choices: [
                 "Yes", new inquirer.Separator(),
                 "No"
             ]
             }
            ]).then(answer => {
                    if(answer.question === "Yes"){
                  items();}
               else{ console.log("Fine, Leave you peasent!!");  connection.end()};
              
            

       
       
       
       
                //  const query =  "SELECT item_id, product_name FROM products";
            //  conection.query(query, function(answer){
            //      if (err) throw err;
            //      console.log(result)
            //  });
         });
        }
