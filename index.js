'use strict';
let mongoose = require('mongoose');
let Initializer = require('./init/Initializer');
Initializer.InitMongoDB(process.env,mongoose);
const fs = require('fs');
const csv = require('csv-parser');
const iconv = require('iconv-lite');

const path = './csv/store';
const csvext = '.csv';
const jsonext = '.json';
const FILE_SEPERATE_COUNT = 10000;
let count = 0;
const regExp = new RegExp('"\\n\"|"\\"','g');
fs.readdir(path, function(err, items) {
    console.log(items);
    items.forEach((file)=>{
        count = count+1;
        if(count>2){
            return;
        }
        new Promise((resolve,reject)=>{
            if(file === '.DS_Store'){
                reject(file);
                return;
            }
            let headerList = [];
            const storeList = [];
            const realPath = path+'/'+file;
            console.log(realPath);
            fs.createReadStream(realPath)
                .pipe(iconv.decodeStream('euc-kr'))
                .pipe(csv({
                    raw: false,     // do not decode to utf-8 strings
                    separator: ',', // specify optional cell separator
                    quote: '"',     // specify optional quote character
                    escape: '"',    // specify optional escape character (defaults to quote value)
                    newline: '\r\n',  // specify a newline character
                    strict: false    // require column length match headers length
                })).on('headers', function (headerArray) {
                    headerArray[headerArray.length-1]= headerArray[headerArray.length-1].replace('"','');
                    headerList = headerArray;
                }).on('data', function (data) {
                    // console.log('Name: %s', data.상호명);
                    /*
                    * TODO 상가업소번호에서 \n\" , \" 두개 필터할 정규표현식 작성 및 필터 작성
                    * TODO 실제 DB에 삽입시 500 row 씩 삽입 요청 보내는 Promise 생성
                    * */
                    const obj = headerList.reduce((o, key)=>(

                        {...o,[key]:data[key]}
                        ),{});
                    storeList.push(obj);
                }).on('end',function () {
                const value = Math.floor(storeList.length/FILE_SEPERATE_COUNT);
                console.log(value);
                const taskList = [];
                for(let index = 0; index<FILE_SEPERATE_COUNT; index++){
                    let task;
                    let chunk;
                    let writeFileName;
                    if(index === FILE_SEPERATE_COUNT-1){
                        chunk = storeList.slice(index*value,storeList.length);
                        writeFileName = file.replace(csvext,'_index'+(index+1)+jsonext);
                        task = new Promise((resolve,reject)=>{
                            if(!chunk) {
                                reject(writeFileName);
                            }
                            fs.writeFile(writeFileName,JSON.stringify(chunk),()=>{
                                resolve(writeFileName);
                            });
                        });
                        taskList.push(task);
                        return;
                    }
                    chunk = storeList.slice(index*value,(index+1)*value);
                    writeFileName = file.replace(csvext,'_index'+(index+1)+jsonext);
                    task = new Promise((resolve,reject)=>{
                        if(!chunk) {
                            reject(writeFileName);
                        }
                        fs.writeFile(writeFileName,JSON.stringify(chunk),()=>{
                            resolve(writeFileName);
                        });
                    });
                    taskList.push(task);
                }

                Promise.all(taskList).then((list)=>{
                    resolve(list);
                }).catch((e)=>{
                    reject(e);
                });
            });
        }).then((list)=>{
            console.log(list+'success');
        }).catch((e)=>{
            console.log(e+' fail');
        });
    });
});


