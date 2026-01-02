//Mentors route to fetch student details. Mentor can update student's marks too

const express=require('express');
const router=express.Router();
const {jwtAuthMiddleware,generateToken}=require('./../jwt');

const Mentor=require('./../models/mentor');
const mentorController=require('./../controllers/mentorController');


//Static routes first, dynamic routes last

router.post('/login',mentorController.loginMentor)

router.use(jwtAuthMiddleware);              //// protected from here. from here onwards for every api below ,jwtAuthMiddleware will be applied.i.e every api needs token to access.


/* ================= ALL MARKS ================= */

router.get('/marks',mentorController.getAllMarks);

/* ================= MARKS BY ROLL ================= */

router.get('/marks/:roll',mentorController.getMarksByRoll);


/* ================= UPDATE MARKS ================= */

router.put('/marks/:roll',mentorController.updateMarksByRoll);


/* ===================== UPLOAD MARKS ==================== */

router.post('/marks/:roll',mentorController.uploadMarksByRoll);


/* ================= STUDENTS BY YEAR ================= */
router.get('/year/:YEAR',mentorController.getStudentsByYear);

/* ================= HOME ================= */

router.get('/',(req,res)=>{
    res.send("Welcome to mentor section of our student management system.\n1) mentors/year/YEAR -> to get student details of given year.\n2) mentors/marks -> to get details about marks of all students.\n3) mentors/marks/:roll -> to get marks details of given student or to update marks of that student. ");
});

module.exports=router;


