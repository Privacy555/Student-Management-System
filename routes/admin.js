const express=require('express');
const router=express.Router();

//const jwt=require('jsonwebtoken');
const Admin=require('./../models/admin');
const Mentor=require('./../models/mentor');

const adminController=require('./../controllers/adminController');

const {jwtAuthMiddleware,generateToken}=require('./../jwt');
const roleMiddleware=require('./../roleMiddleware');



router.post('/login',adminController.loginAdmin);


/* ➕ Create Mentor (ADMIN ONLY) */
router.post('/create-mentor',jwtAuthMiddleware,roleMiddleware('admin'),adminController.createMentor );

module.exports=router;