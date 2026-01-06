const mongoose =require('mongoose');

const bcrypt=require('bcrypt');                     //bcrypt returns strings.

const ProfileSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    dob:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    roll_no:{
        type:Number,
        required:true,
        unique:true
    },
    year:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true});





//for creating hashed password
//Mongoose middleware does NOT get req, res.     in mongoose->  If you use async in a middleware, you must NOT use next.

ProfileSchema.pre('save',async function(){
    const user=this;
    try{
        if(!user.isModified('password'))  return next();

        const salt= await bcrypt.genSalt(10);
        const password=user.password
        const hashedpwd= await bcrypt.hash(password,salt);

        user.password=hashedpwd;

    }catch(err){
        throw err;
    }
})

ProfileSchema.methods.comparePassword=async function(PASSWORD){
    try{
        const isMatch= await bcrypt.compare(PASSWORD,this.password);
        return isMatch;

    }catch(err){
        throw (err);
    }
}

const studentProfileModel = mongoose.model('studentProfileModel',ProfileSchema);

module.exports=studentProfileModel;


//Middleware must be defined BEFORE mongoose.model().