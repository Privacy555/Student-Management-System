const mongoose =require('mongoose');

const MarksSchema= new mongoose.Schema({
    
    roll_no:{
        type:Number,
        required:true
    },
    COA_marks:{
         type: Number, min: 0, max: 100
         },
    Software_engineering:{
         type: Number, min: 0, max: 100
         },
    DSA:{
         type: Number, min: 0, max: 100 
        },
    BI:{
         type: Number, min: 0, max: 100 
        },
    Maths:{
         type: Number, min: 0, max: 100
         },
    HumanValues:{
         type: Number, min: 0, max: 100 
        }
});

const studentMarksModel=mongoose.model('studentMarksDetails',MarksSchema);

module.exports=studentMarksModel;
