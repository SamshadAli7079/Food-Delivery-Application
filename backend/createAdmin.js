const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User");

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB Connected Successfully!");

        const existingAdmin = await User.findOne({
            email: "admin@foodly.com"
        });

        if (existingAdmin) {
            console.log("Admin already exists.");
            process.exit();
        }

        const hashedPassword = await bcrypt.hash(
            "Admin@12345",
            10
        );

        const admin = await User.create({
            name: "Foodly Admin",
            email: "admin@foodly.com",
            password: hashedPassword,
            phone: "9999999999",
            address: "Foodly Admin Office",
            role: "admin"
        });

        console.log("Admin created successfully!");
        console.log("Email:", admin.email);
        console.log("Role:", admin.role);

        process.exit();

    } catch (error) {
        console.error("Admin Creation Error:", error.message);
        process.exit(1);
    }
};

createAdmin();