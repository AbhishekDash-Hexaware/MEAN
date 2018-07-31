var express = require("express");
var bodyparser = require("body-parser");
var routes = require('./routes');
var mongoConnector = require("./MongoConnector")

const loggerConfiguration =require('./config/logger');
const logger= loggerConfiguration.loggerob;

var app = express();

app.use('/app',routes);
app.use(bodyparser.json());
app.set('port', (process.env.PORT || 6000));

logger.info("Testing DB connection");
new mongoConnector().Connect((db,client)=>{
    client.close();
})



app.listen(app.get("port"),(err)=>{
    
    if(err){    
        logger.error("error starting server");
    }else{
        logger.info("SERVER RUNNING at 6000");
    }
    
})