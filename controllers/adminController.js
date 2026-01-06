const Admin= require('./../models/admin');
const Mentor=require('./../models/mentor');
const Fee=require('./../models/studentFeeSchema');

const {jwtAuthMiddleware,generateToken}=require('./../jwt');


exports.loginAdmin= async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await Admin.findOne({ email }).select('+password');        //we did .select('+password')  cuz we have used select:false in password section in mentor model.
        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const passwordMatch = await user.comparePassword(password);
        if (!passwordMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const payload={
            id: user._id,
            role: user.role                     ////role is important for roleMiddleware.
        }
        const token = generateToken(payload);

        res.status(200).json({ token });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.createMentor=async (req, res) => {            //role of middlewares matters.
    try {
        await Mentor.create(req.body);

        res.status(201).json({ message: "Mentor created" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createFee=async(req,res)=>{
    try{
        const data=req.body;
        const roll=req.params.roll;
        const check=await Fee.findOne({roll_no:roll});
        if(check){
            return res.json({message:"Fee record for this roll_no already exists."});
        }
        const response=await Fee.create(req.body);
        console.log("Fee status created successfully.");
        res.status(201).json({message: "Fee status created successfully.",response:response});
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error."});
    }
}

exports.getFee=async(req,res)=>{
    try{
        const roll=req.params.roll;
        const datafromDB= await Fee.findOne({roll_no:roll});                // we can pass just ({roll}) only if we had declared roll instead of roll_no in schema.
        if(!datafromDB){
            return res.status(404).json({error:"Fee record not found."})
        }
        res.status(200).json({datafromDB});
        console.log("Fee data fetched.");

    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error."});
    }
}

exports.updateFee=async(req,res)=>{
    try{
        const roll=req.params.roll;
        const data=req.body;
        const response= Fee.findByIdAndUpdate(roll,data,{
            new:true,
            upsert: true,         // creates if not exists
            runValidators:true
        });
        
        console.log("Fee data updated successfully for roll: ",roll);
        res.status(200).json({message:"Fee updated successfully.\n"});
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error."});
    }
}


/*
We are exporting an object that looks like:

{
  loginAdmin: [Function],
  createMentor: [Function]
}
*/