const studentProfileModel=require('./../models/studentProfile');
const studentMarksSchema=require('./../models/studentMarksSchema');
const Mentor=require('./../models/mentor');

const {jwtAuthMiddleware,generateToken}=require('./../jwt');

exports.loginMentor=async function(req,res){
    try{
        const {email,password}=req.body;
        const mentor= await Mentor.findOne({email}).select('+password');

        if(!email || !password){
            res.send("Fill both email and password fill correctly. ");
        }

        if(!mentor){
            res.status(404).json({error:"User not found."});
        }

        const isPasswordTrue= await mentor.comparePassword(password);

        if(! isPasswordTrue){
            return res.status(401).json({error:"Unauthorized access"});
        }

        const payload={
            id:mentor.id,
            password:mentor.password
        };
        const token= generateToken(payload);

        console.log("logged in successfully by mentor ,token:  ",token);

        res.status(200).json({token:token});
        
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error."});
    }
};



exports.getAllMarks=async(req,res)=>{                                         
    try{
        const response= await studentMarksSchema.find();                   

        console.log("all students marks fetched.");
        res.status(200).json({response});
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error."});
    }
};



exports.getMarksByRoll=async (req,res)=>{
    try{
        const roll=Number(req.params.roll);
        const student= await studentMarksSchema.findOne({roll_no:roll});
        console.log("Data fetched of roll : ",roll);
        res.status(200).json({student});
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error."});
    }
};



exports.updateMarksByRoll=async(req,res)=>{
    try{
        const roll=Number(req.params.roll);
        const data=req.body;
        
        const response= await studentMarksSchema.findOneAndUpdate({ roll_no: roll }, data, {
            new: true,
            runValidators:true
        });


        console.log("Student's marks updated successfully.");
        res.status(200).json({response});
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error."});
    }
};



exports.uploadMarksByRoll=async(req,res)=>{
    try{
        const roll=Number(req.params.roll);
        const data=req.body;
        
        const marks= studentMarksSchema(data);
        const response=marks.save();

        console.log("Student's marks uploaded successfully.");
        res.status(200).json({response});
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error."});
    }
};



exports.getStudentsByYear=async function(req,res){                                //dynamic api at last
    try{
        const year = Number(req.params.YEAR);
        if(year===1 || year===2 || year===3 || year===4){
            const students= await studentProfileModel.findOne({year:year});
            console.log("Data fetched.")
            res.status(200).json({students});
        }else{
            res.status(404).json({error:"Invalid year given"});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({eror:"Internal server error"});
    }
        
}