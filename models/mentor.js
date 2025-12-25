
//only admin can add teacher's information.

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    id: {
        type: Number,
        required: true,
        unique: true
    },

    mentorOf: [
        {
            year: {
                type: Number,
                required: true,
                enum: [1, 2, 3, 4]
            },
            section: {
                type: String,
                required: true,
                uppercase: true
            }
        }
    ],

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },

    password: {
        type: String,
        required: true,
        select: false
    }
}, 
{
    timestamps: true
});



/* HASH PASSWORD */
teacherSchema.pre('save', async function () {                       //Mongoose does NOT pass next to async middleware.
    if (!this.isModified('password')) return ;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
   
});

/* COMPARE PASSWORD */
teacherSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

const mentorSchema= new mongoose.model('mentorSchema',teacherSchema);

module.exports=mentorSchema;