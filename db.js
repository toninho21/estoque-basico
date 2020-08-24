const mongoClient = require("mongodb").MongoClient;
mongoClient.connect("mongodb://localhost", { useUnifiedTopology: true })
            .then(conn => global.conn = conn.db("estoquebasico"))
            .catch(err => console.log(err))
function findAll(callback){
         global.conn.collection("estoque").find({}).toArray(callback);
}
function insert(estoque, callback){
    global.conn.collection("estoque").insert(estoque, callback);
}

var ObjectId = require("mongodb").ObjectId;
function findOne(id, callback){
    global.conn.collection("estoque").find(new ObjectId(id)).toArray(callback);
}

function update(id, estoque, callback){
    global.conn.collection("estoque").updateOne({_id: new ObjectId(id)}, {$set: estoque}, callback);
}
function deleteOne(id, callback){
    global.conn.collection("estoque").deleteOne({_id: new ObjectId(id)}, callback);
}

module.exports = { findAll, insert, findOne, update, deleteOne }
