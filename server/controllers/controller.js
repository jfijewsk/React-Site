var MongoClient = require('mongodb').MongoClient;
var DbConnection = require('./database');

function getCompanyName(ip) {
    var result = '';

    // console.log('atempting to call: http://ip-api.com/json/' + ip);
    // http.get('http://ip-api.com/json/208.73.132.195', (resp) => {
    
    http.get(('http://ip-api.com/json/' + ip), (resp) => {

    let data = '';
    
    // A chunk of data has been received.
    resp.on('data', (chunk) => {
        data += chunk;
    });
    
    // The whole response has been received. Print out the result.
    resp.on('end', () => {
        // console.log('response ' + JSON.parse(data).org);
        //this.result = JSON.parse(data).org;
        //console.log('result ' + result);
        return(JSON.parse(data));
    });
    
    }).on("error", (err) => {
    console.log("Error: " + err.message);
    });
    

}

function getClientAddress(req) {
    return req.ip.split(":").pop();
};


// MongoDB 
async function getAllHistory(){
    try{
        let db = await DbConnection.Get();
        result = await db.collection("visitors").find({}).toArray(function(err, result) {
            console.log(result);
            return result;
        });
    }
    catch(err){
        console.log("Failed to get all database history\n" + err);
    }
}


module.exports = {getCompanyName, getClientAddress, getAllHistory};