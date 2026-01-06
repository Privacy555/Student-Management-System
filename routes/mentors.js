//Mentors route to fetch student details. Mentor can update student's marks too

const express=require('express');
const router=express.Router();
const {jwtAuthMiddleware,generateToken}=require('./../jwt');


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
    res.json({
        message: "Welcome to Mentor API",
        availableRoutes: {
            getStudentsByYear: {
                method: "GET",
                path: "/mentors/year/:YEAR",
                description: "Get student details of a given year"
            },
            getAllMarks: {
                method: "GET",
                path: "/mentors/marks",
                description: "Get marks of all students"
            },
            getOrUpdateMarks: {
                method: "GET / PUT",
                path: "/mentors/marks/:roll",
                description: "Get or update marks of a specific student"
            }
        }
    })
});

module.exports=router;


