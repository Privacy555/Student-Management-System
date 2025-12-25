const mongoose=require('mongoose');

require('dotenv').config();

const mongooseURL=process.env.LOCAL_DB;

mongoose.connect(mongooseURL);

const db=mongoose.connection

db.on('connected',()=>{
    console.log("Database is connected successfully.");
});

db.on('disconnected',()=>{
    console.log("Database is disconnected.");
});

db.on('error',(err)=>{
    console.log("error connecting to database.",err);
});


module.exports=db;