'use strict';

/**
 * CreatedAt 2017-11-16 14:07:00 kst
 * by kim ji woon
 *
 */

exports.InitMongoDB = function (env, mongoose) {

    if (!env.VCAP_SERVICES) {
        /**
         * @TODO Local Initialization
         * Please Input ./credentials/credential.js
         */
        var credentials = require('./credential');
        var options = {
            connectTimeoutMS: 4000,
            keepAlive: true,
            ha: true,
            autoReconnect: true,
            reconnectTries: 30
        };
        var db = mongoose.connect(credentials.MongodbURI, options);
        db.then(function () {
            console.log('connection success');
        }).catch(function (err) {
            console.error(err);
        });
    } else {
        /**
         * @TODO Production Environment Initialization
         */
        var service = JSON.parse(env.mLabmongodb);
        var mongodb = service['mLab-mongodb'];
        var connection_string = mongodb[0].credentials.uri;

        //mLab mongodb option
        var _options = {
            connectTimeoutMS: 4000,
            keepAlive: true,
            ha: true,
            autoReconnect: true,
            reconnectTries: 30
        };
        var _db = mongoose.connect(connection_string, _options);
        _db.then(function () {
            console.log('connection success');
        }).catch(function (e) {
            console.log(e);
        });
    }
};
//# sourceMappingURL=Initializer.js.map