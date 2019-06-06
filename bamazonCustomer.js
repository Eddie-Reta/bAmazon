//npm installed packages for this app to work
var mysql = require('mysql');
var inquirer = require('inquirer');


var connection = mysql.createConnection({
    host: "localhost",
  // port to connect to
port : 3306,

// mysql username to be used in the connection 
user:"root",

// password for the connection
password: "",

//database within mysql workbench 
database: "bamazon"
});

connection.connect( function(err){
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
    items();
});

function items(){
    console.log("Here is the list of the items for purchase!")
    var query = "SELECT * FROM products";
    connection.query(query, function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++){
            console.log(res[i].item_id + "   |   " + res[i].product_name + "  |-----DePARTMENT-----|  "+ res[i].department_name + " |-----PRICE-----| " + res[i].price + " |-----AVIALABLE-----| " + res[i].stock_quantity)
        }
        console.log('----------------------');
      });
}



// function items(){
//     inquirer.prompt({
//             name: "items",
//             type: "input",
//             message: "Please choose the ID of the product you would like to purchase?"
//     }).then(function(){
//         var query = "SELECT item_id, product_name, department_name, price, stock_quantity FROM products WHERE ?";
//         connection.query(query);
//     });
// }


// function start(){
//     inquirer
//         .prompt({
//             name: "Choose id item."
//             type: ""
//         })
// }

