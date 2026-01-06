const express=require('express');
const app= express();

const bodyParser=require('body-parser');
app.use(bodyParser.json());

const db=require('./db');

require('dotenv').config();


// const passport=require('./auth.js');
// app.use(passport.initialize());
// const authMiddleware=passport.authenticate('local',{session:false});




//rotes here

const adminRoute=require('./routes/admin');
app.use('/admin',adminRoute);

const studentsRoute= require('./routes/students');
console.log(typeof studentsRoute); // must be function
app.use('/students',studentsRoute);


const mentorsRoute=require('./routes/mentors');
const { message } = require('prompt');
console.log(typeof mentorsRoute);  // must be function
app.use('/mentors',mentorsRoute);


//const teacherRoute=require('./models/teachers');
//app.use('/teachers',teacherRoute);

app.get('/',(req,res)=>{
    res.json({
        message: "Welcome to Student API",
        routes: {
            signup: "/students/signup",
            login: "/students/login",
            profile: "/students/profile (token required)",
            fees: "/students/profile/fees"
        }
    });
});

const PORT=process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
