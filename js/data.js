// const fs = require('fs');
// const csv = require('@fast-csv/parse');

// // Retrieve data from .csv file

//     let y = [];

//     csv.parseFile("../products.csv")
//         .on('error', error => console.error(error))
//         .on('data', row => {
//             y.push(JSON.stringify(row))
//         })
//         .on('end', rowCount => {
//         console.log(`Parsed ${rowCount} rows`)
//         console.log(y)
//     }
//         );

// //module.exports = X();

// const fs = require('fs');
// const csv = require('@fast-csv/parse');

// const stream = fs.createReadStream('../products.csv');

// csv.parseStream(stream)
//     .on('error', error => console.error(error))
//     .on('data', row => console.log(`ROW=${JSON.stringify(row)}`))
//     .on('end', rowCount => console.log(`Parsed ${rowCount} rows`));

// console.log(stream)