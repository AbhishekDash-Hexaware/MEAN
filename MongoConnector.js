const MongoClient = require('mongodb').MongoClient;
const config = require("./config/config")
const loggerConfiguration =require('./config/logger');
const logger= loggerConfiguration.loggerob;

class MongoConnector{

    constructor(){
        // console.log(config.Mongo.MongoUrl);
        logger.info("DB URL: "+config.Mongo.MongoUrl);
        logger.info("DB name: "+config.Mongo.MongoDbName);
        this.url = config.Mongo.MongoUrl;
        this.dbName = config.Mongo.MongoDbName;

    }

    Connect(callback){

        var option={ useNewUrlParser: true }
    
        MongoClient.connect(this.url ,option, function(err, client) {

            if(err==null){

                logger.info("Connected successfully to MongoDB");
                const db = client.db(config.Mongo.DbName);
                callback(null,client);
            }else{

                logger.error("Failed to connect to MongoDB")

                
            }
            
        });
    
    }

    insertSingle(db,collectionName,record,callback){

        // Insert a single document
        db.collection(collectionName).insertOne(record, function(err, r) {
            
            if(err == null && 1 == r.insertedCount){
                callback(null,r);
            }else{
                callback(err,null);
            }

        });
        

    }


    insertMultiple(db,collectionName,records,callback){
        
        db.collection(collectionName).insertMany(records, function(err, r) {
            // assert.equal(null, err);
            // assert.equal(records.length, r.insertedCount);
            if(err== null && records.length == r.insertedCount){
                callback(null,r);
            }else{
                callback(err,null);
            }
        });
    }


    findRecord(db,collectionName,key,callback){
        logger.debug("finding")
        db.collection(collectionName).find(key).toArray((err,doc)=>{
            if(err==null){

                logger.debug("Found the following records");
                callback(null,doc);

            }else{

                callback(err,null)

            }
            
        });

    }
}   

module.exports = MongoConnector;


// mongodb://abhi:saswatid123@ds147461.mlab.com:47461/sasmeandb