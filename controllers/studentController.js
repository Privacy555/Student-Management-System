const {jwtAuthMiddleware,generateToken}=require('./../jwt');
const studentProfileModel=require('./../models/studentProfile');
const studentMarksModel=require('./../models/studentMarksSchema');
const studentFeeStructure =require('./../models/studentFeeSchema');


exports.signupStudent=async(req,res)=>{
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
};


exports.loginStudent=async(req,res)=>{
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
};


exports.getProfile=async function(req,res){
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
};


exports.updateProfile=async function(req,res){
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
};



exports.getFees=async function (req,res) {
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
};


exports.getMarks=async function(req,res){
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
};