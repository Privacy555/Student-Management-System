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
    res.json({
    message: "Welcome to Admin API",
    endpoints: {
        login: {
            method: "POST",
            path: "/admin/login",
            description: "Admin login"
        },
        createFee: {
            method: "POST",
            path: "/admin/:ROLL_NUM/createFee",
            description: "Create fee details"
        },
        updateFee: {
            method: "PUT",
            path: "/admin/:ROLL_NUM/updateFee",
            description: "Update existing fee details"
        },
        getFee: {
            method: "GET",
            path: "/admin/:ROLL_NUM/getFee",
            description: "Fetch fee details"
        }
    }
});
});

module.exports=router;