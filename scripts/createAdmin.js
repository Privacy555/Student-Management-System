const mongoose = require('mongoose');
require('dotenv').config();

const Admin = require('../models/admin');

mongoose.connect(process.env.LOCAL_DB);

(async () => {
    const adminExists = await Admin.findOne({ email: 'admin@school.com' });
    if (adminExists) {
        console.log('Admin already exists');
        process.exit();
    }

    await Admin.create({
        name: 'Super Admin',
        email: 'admin@school.com',
        password: 'admin@123'
    });

    console.log('Admin created successfully');
    process.exit();
})();


// run this command once  node scripts/createAdmin.js