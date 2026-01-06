const express=require('express');
const router=express.Router();

//const jwt=require('jsonwebtoken');
const Admin=require('./../models/admin');
const Mentor=require('./../models/mentor');

const adminController=require('./../controllers/adminController');

const {jwtAuthMiddleware,generateToken}=require('./../jwt');
const roleMiddleware=require('./../roleMiddleware');

router.post('/login',adminController.loginAdmin);

router.use(jwtAuthMiddleware,roleMiddleware('admin'));



router.post('/:roll/createFee',adminController.createFee);

router.put('/:roll/updateFee',adminController.updateFee);

router.get('/:roll/getFee',adminController.getFee);


/* ➕ Create Mentor (ADMIN ONLY) */
router.post('/create-mentor',adminController.createMentor );

router.get('/',(req,res)=>{
    res.send(`
             1. admin/login               -> for logging in
             2. admin/:ROLL_NUM/createFee -> for creating fee details.
             3. admin/:ROLL_NUM/updateFee -> for updating fee details of existing user.
             4. admin/:ROLL_NUM/getFee    -> for fetching fee details.
        `)
});

module.exports=router;