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
     res.json({
        message: "Welcome to Student API",
        endpoints: {
            signup: {
                method: "POST",
                path: "/students/signup",
                description: "Student registration"
            },
            login: {
                method: "POST",
                path: "/students/login",
                description: "Student login"
            },
            profile: {
                method: "GET",
                path: "/students/profile",
                authRequired: true,
                description: "Get student profile details"
            },
            fees: {
                method: "GET",
                path: "/students/profile/fees",
                authRequired: true,
                description: "Get student fee status"
            }
        }
    });
});


module.exports=router;

/*
The API path only decides which function (API) gets called.
The database update depends entirely on which model you use inside that function.

They are independent.
*/