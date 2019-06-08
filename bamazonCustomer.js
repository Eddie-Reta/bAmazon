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
   start();
});

function items(){
    console.log("Here is the list of the items for purchase!")
    var query = "SELECT * FROM products";
    connection.query(query, function(err, res) {
              if (err) throw err;
        for (var i = 0; i < res.length; i++){
            console.log( "ID number: " + res[i].item_id + "\n |-----PRODUCT-----|  " + res[i].product_name +  "\n |-----DEPARTMENT-----|  "+ res[i].department_name + "\n |-----PRICE-----|  " + res[i].price + "\n |-----AVIALABLE-----|  " + res[i].stock_quantity)
        }
        console.log('----------------------');
      });
    }


     start = () => {
     inquirer .prompt([
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
                  items();
                chosenItem();
            }
               else{ console.log("Fine, Leave you peasent!!");  connection.end()};
         });
        }
         
        var quantityOfProduct = [];
        var onePrice = [];

        chosenItem = () => {
            connection.query("SELECT * FROM products", function(err, res){
                if (err) throw err;

            inquirer.prompt([
                {
                    name: "choice",
                    type: "list",
                    message: "Choose an item's ID [1-10]",
                    choices: function(){
                        var choiceArray =[];
                        for (let i = 0; i < res.length; i++){
                            choiceArray.push(res[i].item_id)
                        }
                        return choiceArray;
                    }
                }
            ]).then(answer => {
                for (var i = 0; i < res.length; i++){
                    if (res[i].item_id === answer.choice){
                       console.log("Your id of choice is: " + res[i].item_id + '\n Your product: ' + res[i].product_name + '\n Price is $' + res[i].price + "\n  We have " +res[i].stock_quantity +" in stock.");

                       quantityOfProduct.push(res[i].stock_quantity);

                       onePrice.push(res[i].price);
                    }
                }
                console.log('------------------------------------------------------------------------')
                howMany()
            })
            
        });
    }


    howMany = () => {
            inquirer.prompt([
                {
        name: "quantity",
        type: "input",
        message: "How many would you like to purchase?",
        validate: function(value) {
        
            if (isNaN(value) === false){
                return true;
            }
            return(false + console.log("   Please choose a number!!!"));
            
        }
    }
            ]).then( answer => {
            
                const total = onePrice * answer.quantity;
                if (quantityOfProduct > answer.quantity || quantityOfProduct == answer.quantity){
                    console.log(answer.quantity)
                    console.log("Ok! Your total price will be " + "$" + total)
                    connection.end();
                } else {
                    console.log("Insufficient Quantity!")
                    console.log('------------------------------------------------------------------------')
                    howMany()
                }
         
             })
        
   
    }