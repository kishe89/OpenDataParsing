'use strict';

var mongoose = require('mongoose');
var Initializer = require('./init/Initializer');
Initializer.InitMongoDB(process.env, mongoose);
var Parser = require('./parsing/CSVParser');
//
// const csvFilePath='./parsing/store_201706_01.csv';
// const csv=require('csvtojson')
// csv()
//     .fromFile(csvFilePath)
//     .on('json',(jsonObj)=>{
//         // combine csv header row and csv line to a json object
//         // jsonObj.a ==> 1 or 4
//         console.log(jsonObj);
//     })
//     .on('done',(error)=>{
//         console.log('end')
//     });

var CSVParser = new Parser();

CSVParser.storeCsvToJson();
//# sourceMappingURL=index.js.map