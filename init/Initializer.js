/**
 * CreatedAt 2017-11-16 14:07:00 kst
 * by kim ji woon
 *
 */

exports.InitMongoDB = function (env,mongoose) {

    if(!env.VCAP_SERVICES){
        /**
         * @TODO Local Initialization
         * Please Input ./credentials/credential.js
         */
        let credentials = require('./credential');
        const options = {
            connectTimeoutMS: 4000,
            keepAlive:true,
            ha:true,
            autoReconnect:true,
            reconnectTries:30
        };
        let db = mongoose.connect(credentials.MongodbURI,options);
        db.then(function () {
            console.log('connection success');
        }).catch(function (err) {
            console.error(err);
        });
    }else{
        /**
         * @TODO Production Environment Initialization
         */
        let service = JSON.parse(env.mLabmongodb);
        let mongodb = service['mLab-mongodb'];
        let connection_string = mongodb[0].credentials.uri;

        //mLab mongodb option
        const options = {
            connectTimeoutMS: 4000,
            keepAlive:true,
            ha:true,
            autoReconnect:true,
            reconnectTries:30
        };
        let db = mongoose.connect(connection_string,options);
        db.then(function () {
            console.log('connection success');
        }).catch(function (e) {
            console.log(e);
        });

    }
};