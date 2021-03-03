//npm installed packages for this app to work
const mysql = require("mysql2");
const inquirer = require("inquirer");
const { table } = require("table");
const fs = require("fs");
const csv = require("@fast-csv/parse");

// Retrieve data from .csv file

let csvData = [];

csv
  .parseFile("./products.csv")
  .on("error", (error) => console.error(error))
  .on("data", (row) => {
    csvData.push(JSON.stringify(row));
  })
  .on("end", () => {
    csvData.shift();

    const connection = mysql.createConnection({
      host: "localhost",
      // port to connect to
      port: 3306,

      // insert mysql username to be used in the connection
      user: "root",

      // insert password for the connection
      password: "",
    });

  // Connection to mysql 
    connection.connect(function (err) {

      if (err) {
        return console.error("error connecting: " + err.stack);
      }
      console.log("connected as id " + connection.threadId);

      //Creating database if non existant

      connection.query(
        "CREATE DATABASE IF NOT EXISTS bamazon",
        function (err, result) {
          if (err) throw err;
          console.log("Database connected.");
          const db = "USE bamazon";
          connection.query(db);
          
          //Query for data input into table

          const sql =
            "CREATE TABLE IF NOT EXISTS products (id INT PRIMARY KEY NOT NULL,name VARCHAR(40) NOT NULL,description VARCHAR(40) NOT NULL,price DECIMAL(15, 2),link VARCHAR(500))";

          connection.query(sql, function (err, result) {
            if (err) {
              console.log(err);
            } else {
              console.log("Table access ok!");
              let query1 =
                "REPLACE INTO products (id,name,description,price,link) VALUES ?";

              const dataCSV = [];
   
              //Parse data 
              for (var i = 0; i < csvData.length; i++) {
                var x = JSON.parse(csvData[i])
                dataCSV.push(x);
              }
              
              //pushing data into table

                connection.query(query1,[dataCSV], (error) => {
                  if (error) throw error;
                  start(dataCSV);
                });

            }
          });
        }
      );

      //Start prompt and app

      const start = (data) => {
        inquirer
          .prompt([
            {
              type: "list",
              message: "Welcome lets looks at the products we have available?",
              choices: [
                new inquirer.Separator(),
                "Yes",
                "No",
              ],
              name: "answer",
            }
          ])
          .then((answers) => {
      
              if (answers.answer === "Yes") {
      
                 products1();
              //   chosenItem();
              } else {
                console.log("\n\nMaybe next time we will have the product you are looking for.");
                connection.end();
              }
          })
          .catch(error => {
              if(error.isTtyError) {
                  console.log("\n\nPrompt couldn't be rendered in the current environment")
      
                } else {
                  // Something else went wrong
                }
          })
      };

      //provide product table
      
      const products1 = () => {
          console.log("Here is the list of products available.");
          
          var query = "SELECT * FROM products";
      
          connection.query(query, function(err, res) {
            if (err) throw err;
        
        const tableData = []
            
        for (var i = 0; i < res.length; i++) {
          const entries = Object.entries(res[i]);
          for (var i = 0; i < entries.length; i++) {
            console.log(entries[i].slice(","))
          }
            };
             let data,
              output
            console.log(tableData)
              data = tableData;
              
           //  console.log(output = table(data));
            // const entries = Object.entries(res);

            // for (var i = 0; i < entries.length; i++) {
            //   console.log(entries[i]);
            // }
            //  let data,
            //   output
      
            //   data = entries;
              
            //   output = table(data);
          });
        }








    });
  });

// Start function when app launches.

// const start = (data) => {
//   inquirer
//     .prompt([
//       {
//         type: "list",
//         message: "Welcome lets looks at the products we have available?",
//         choices: [
//           new inquirer.Separator(),
//           "Yes",
//           "No",
//         ],
//         name: "answer",
//       }
//     ])
//     .then((answers) => {

//         if (answers.answer === "Yes") {

//            products1();
//         //   chosenItem();
//         } else {
//           console.log("\n\nMaybe next time we will have the product you are looking for.");
//           connection.end();
//         }
//     })
//     .catch(error => {
//         if(error.isTtyError) {
//             console.log("\n\nPrompt couldn't be rendered in the current environment")

//           } else {
//             // Something else went wrong
//           }
//     })
// };

// const products1 = () => {
//     console.log("Here is the list of products available.");

//     // let data,
//     //     output

//     //     data = [];
//     //     output = table(data);

//     var query = "SELECT * FROM products";

//     connection.query(query, function(err, res,fields) {
//       if (err) throw err;
//       console.log(res);
//     });
//   }
    //   if (err) throw err;
    //   for (var i = 0; i < res.length; i++) {
    //     console.log(
    //       "ID number: " +
    //         res[i].item_id +
    //         "\n |-----PRODUCT-----|  " +
    //         res[i].product_name +
    //         "\n |-----DEPARTMENT-----|  " +
    //         res[i].department_name +
    //         "\n |-----PRICE-----|  " +
    //         res[i].price +
    //         "\n |-----AVIALABLE-----|  " +
    //         res[i].stock_quantity
    //     );
    //   }
    //   console.log("----------------------");
    // });
  // };

// var quantityOfProduct = [];
// var onePrice = [];

// chosenItem = () => {
//   connection.query("SELECT * FROM products", function (err, res) {
//     if (err) throw err;

//     inquirer
//       .prompt([
//         {
//           name: "choice",
//           type: "list",
//           message: "Choose an item's ID [1-10]",
//           choices: function () {
//             var choiceArray = [];
//             for (let i = 0; i < res.length; i++) {
//               choiceArray.push(res[i].item_id);
//             }
//             return choiceArray;
//           },
//         },
//       ])
//       .then((answer) => {
//         for (var i = 0; i < res.length; i++) {
//           if (res[i].item_id === answer.choice) {
//             console.log(
//               "Your id of choice is: " +
//                 res[i].item_id +
//                 "\n Your product: " +
//                 res[i].product_name +
//                 "\n Price is $" +
//                 res[i].price +
//                 "\n  We have " +
//                 res[i].stock_quantity +
//                 " in stock."
//             );

//             quantityOfProduct.push(res[i].stock_quantity);

//             onePrice.push(res[i].price);
//           }
//         }
//         console.log(
//           "------------------------------------------------------------------------"
//         );
//         howMany();
//       });
//   });
// };

// howMany = () => {
//   inquirer
//     .prompt([
//       {
//         name: "quantity",
//         type: "input",
//         message: "How many would you like to purchase?",
//         validate: function (value) {
//           if (isNaN(value) === false) {
//             return true;
//           }
//           return false + console.log("   Please choose a number!!!");
//         },
//       },
//     ])
//     .then((answer) => {
//       const total = onePrice * answer.quantity;
//       if (
//         quantityOfProduct > answer.quantity ||
//         quantityOfProduct == answer.quantity
//       ) {
//         console.log(answer.quantity);
//         console.log("Ok! Your total price will be " + "$" + total);
//         connection.end();
//       } else {
//         console.log("Insufficient Quantity!");
//         console.log(
//           "------------------------------------------------------------------------"
//         );
//         howMany();
//       }
//     });
// };
