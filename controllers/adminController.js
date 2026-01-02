const Admin= require('./../models/admin');
const Mentor=require('./../models/mentor');

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
}

exports.createMentor=async (req, res) => {            //role of middlewares matters.
    try {
        await Mentor.create(req.body);

        res.status(201).json({ message: "Mentor created" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}




/*
We are exporting an object that looks like:

{
  loginAdmin: [Function],
  createMentor: [Function]
}
*/