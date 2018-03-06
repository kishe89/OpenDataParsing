'use strict';

var CSVParser = function CSVParser() {
    if (!(this instanceof CSVParser)) {
        throw new TypeError('CSVParser must created by new');
    }
    var parser = require('csvtojson');
    var Type = {
        Json: 'json',
        CSV: 'csv',
        Done: 'done'
    };
    return {
        storeCsvToJson: function storeCsvToJson() {
            var csvFilePath = './csv/store/store_201706_01.csv';
            parser().fromFile(csvFilePath).on(Type.Json, function (obj) {
                console.log(obj);
            }).on(Type.Done, function (error) {
                console.log(error);
            });
        }
    };
};
module.exports = CSVParser;
//# sourceMappingURL=CSVParser.js.map