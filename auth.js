
const passport=require('passport');
const localStrategy= require('passport-local').Strategy;

const TeacherModel=require('./models/mentor');

passport.use(new localStrategy({usernameField:"email"},async(EMAIL,PASSWORD,done)=>{                 //Passport Local Strategy automatically extracts email/usename(we are using email instead of username here ) and password, but only from specific locations (body, query, params) and only if the fields exist.
    try{

        //console.log("Fetched email  and password from URL by passportLocalStrategy =",EMAIL ,PASSWORD)
        const user= await TeacherModel.findOne({email:EMAIL});

        if(!user){                                                              //checking if that USERNAME one data is available in db
            return done(null,false,{message:"Mentor doesn't exist"});
        }

        const isPasswordMatch= await user.comparePassword(PASSWORD);
        
        if(isPasswordMatch){
            return done(null,user)
        }else{
            return done(null,false,{message:"Incorrect password for given mentor. "});
        }


    }catch(err){
        return done(err);
    }
}));

module.exports=passport;