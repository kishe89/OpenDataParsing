'use strict';
let CSVParser = function () {
    if(!(this instanceof CSVParser)){
        throw new TypeError('CSVParser must created by new');
    }
    const parser = require('csvtojson');
    const Iconv = require('iconv').Iconv;
    const iconv = new Iconv('euc-kr','utf-8//translit//ignore');
    const fs = require('fs');
    const Type = {
        Json:'json',
        Data:'data',
        CSV:'csv',
        Done:'done'
    };
    return {
        storeCsvToJson:function () {
            const csvFilePath='./csv/store/store_201706_02.csv';
            parser().fromStream(fs.createReadStream(csvFilePath))
                .on(Type.Data,(data)=>{
                    //data is a buffer object
                    // console.log(data);
                    let utf8string = iconv.convert(data).toString();
                    console.log(utf8string);
                })
                // .on(Type.Json,(obj)=>{
                //     //
                //     // let str = iconv.decode(obj, 'utf8');
                //     // console.log(str);
                //
                // })
                .on(Type.Done,(error)=>{
                    console.log(error)
                });

        }
    };
};
module.exports = CSVParser;