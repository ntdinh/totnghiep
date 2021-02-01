import mongoose from "mongoose";
import bluebird from "bluebird";

//conet toi CSDL
let connectDB = ()=>{
    mongoose.Promise = bluebird;
    let URI = `${DB_CONNECTION}://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

    return mongoose.connect(URI,{useMongoClient:true});
};

module.exports = connectDB;