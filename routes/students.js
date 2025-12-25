const express=require('express');
const router=express.Router();

const studentProfileModel=require('./../models/studentProfile');
const studentMarksModel=require('./../models/studentMarksSchema');
const studentFeeStructure =require('./../models/studentFeeSchema');
const {jwtAuthMiddleware,generateToken}=require('./../jwt')

router.post('/signup',async(req,res)=>{
    try{
        const data=req.body;
        const User= new studentProfileModel(data);
        const response= await User.save();

        console.log('data saved.');

        const payload={
            roll_no:response.roll_no,
            name:response.name
        }

        const token= generateToken(payload);

        console.log("Token is generated : ",token);
        res.status(200).json({message:"signup successful.",token:token});      //for security reasons, we don't show response     
        
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error. "});
    }
});


router.post('/login',async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user= await studentProfileModel.findOne({email:email});

        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }   


        const isMatch= await user.comparePassword(password)
        if(!isMatch){
            return res.status(401).json({ error: "Invalid email or password" });
        }
        const payload={
            roll_no:user.roll_no,
            name:user.name
        }

        const token= generateToken(payload);
        res.status(200).json({token});
    }catch(err){
        console.error(err);
        res.status(500).json({error:"Internal server error."});
    }
});

router.get('/profile',jwtAuthMiddleware,async function(req,res){
    try{
        const userData=req.user;
        const userRoll=userData.roll_no;                   //roll_no is defined as roll_no in payload
        const datafromDB= await studentProfileModel.findOne({roll_no:userRoll});
        console.log(datafromDB);

        res.status(200).json({datafromDB});
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error."});
    }
});

router.get('/profile/fees',jwtAuthMiddleware,async function (req,res) {
    try{
        const userData= req.user;
        const userRoll=userData.roll_no;

        const datafromDB= await studentFeeStructure.findOne({roll_no:userRoll});
        console.log(datafromDB);
        res.status(200).json({datafromDB})
    }catch(err){
        console.log(err);
        res.status(500).json({error:err});
    }
});

router.get('/profile/marks',jwtAuthMiddleware,async function(req,res){
    try{
        const userData= req.user;
        const userRoll=userData.roll_no;

        const datafromDB=await studentMarksModel.findOne({roll_no:userRoll});
        console.log(datafromDB);
        res.status(200).json({datafromDB});
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error."});
    }
})

router.put('/profile',jwtAuthMiddleware,async function(req,res){
    try{
        const userData= req.user;
        const userRoll=userData.roll_no;

        const data=req.body;                    //updating data is recieved from req.body

        const updateData= await studentProfileModel.findOneAndUpdate({roll_no:userRoll},data,{
            new:true,
            runValidators:true
        });

        if(!updateData){
            res.status(404).json({error:"Student not found."});
        }
        console.log("updated successfully");
        res.status(200).json({updateData});
    }catch(err){
        console.error(err);
        res.status(500).json({error:"Internal server error."});
    }
});

router.get('/',(req,res)=>{
    res.send("Welcome to our student page . from here onwards,just by changing path,you'll be directed to different informations.\n 1. students/signup ->for signup\n 2. students/login ->for login \n 3. students/profile (make sure to send request with token) ->for your information\n 4. students/profile/fees ->for your fees status")
});


module.exports=router;

/*
The API path only decides which function (API) gets called.
The database update depends entirely on which model you use inside that function.

They are independent.
*/