const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User");

const createDelivery = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB Connected Successfully!");

        const existingDelivery = await User.findOne({
            email: "delivery@foodly.com"
        });

        if (existingDelivery) {
            console.log("Delivery agent already exists.");
            process.exit();
        }

        const hashedPassword = await bcrypt.hash(
            "Delivery@12345",
            10
        );

        const delivery = await User.create({
            name: "Foodly Delivery",
            email: "delivery@foodly.com",
            password: hashedPassword,
            phone: "8888888888",
            address: "Hyderabad",
            role: "delivery",
            deliveryStatus: "Available",
            vehicleType: "Bike",
            vehicleNumber: "TS09AB1234"
        });

        console.log("Delivery agent created successfully!");
        console.log("Email:", delivery.email);
        console.log("Role:", delivery.role);
        console.log("Status:", delivery.deliveryStatus);
        console.log("Vehicle:", delivery.vehicleType);
        console.log("Vehicle Number:", delivery.vehicleNumber);

        process.exit();

    } catch (error) {
        console.error(
            "Delivery Creation Error:",
            error.message
        );

        process.exit(1);
    }
};

createDelivery();