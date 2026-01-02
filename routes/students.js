const express=require('express');
const router=express.Router();

const studentProfileModel=require('./../models/studentProfile');
const studentMarksModel=require('./../models/studentMarksSchema');
const studentFeeStructure =require('./../models/studentFeeSchema');
const {jwtAuthMiddleware,generateToken}=require('./../jwt');

const studentController=require('./../controllers/studentController');

router.post('/signup',studentController.signupStudent);


router.post('/login',studentController.loginStudent);

router.get('/profile',jwtAuthMiddleware,studentController.getProfile);

router.get('/profile/fees',jwtAuthMiddleware,studentController.getFees);

router.get('/profile/marks',jwtAuthMiddleware,studentController.getMarks)

router.put('/profile',jwtAuthMiddleware,studentController.updateProfile);

router.get('/',(req,res)=>{
    res.send("Welcome to our student page . from here onwards,just by changing path,you'll be directed to different informations.\n 1. students/signup ->for signup\n 2. students/login ->for login \n 3. students/profile (make sure to send request with token) ->for your information\n 4. students/profile/fees ->for your fees status")
});


module.exports=router;

/*
The API path only decides which function (API) gets called.
The database update depends entirely on which model you use inside that function.

They are independent.
*/