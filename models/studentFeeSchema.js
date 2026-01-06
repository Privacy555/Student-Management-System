const mongoose =require('mongoose');

const feeSchema= new mongoose.Schema({
    roll_no:{
        type:Number,
        required:true,
        unique:true
    },
    firstYear:{
        type:Boolean,
        default:false
    },
    secondYear:{
        type:Boolean,
        default:false
    },
    thirdYear:{
        type:Boolean,
        default:false
    },
    fourthYear:{
        type:Boolean,
        default:false
    }
},{timestamps:true});

const studentFeeStructure=mongoose.model('studentFeeStructure',feeSchema);

module.exports=studentFeeStructure;