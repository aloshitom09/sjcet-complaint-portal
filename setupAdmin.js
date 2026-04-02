const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, {}).then(async () => {
    let email = "admin@sjcet.com";
    let admin = await User.findOne({ email });
    if (!admin) {
        admin = await User.create({
            name: "Admin",
            email: "admin@sjcet.com",
            password: await bcrypt.hash("admin123", 10),
            role: "admin"
        });
        console.log("Admin created successfully");
    } else {
        console.log("Admin already exists");
    }
    process.exit(0);
}).catch(err => {
    console.error("DB Connection Error:", err);
    process.exit(1);
});
