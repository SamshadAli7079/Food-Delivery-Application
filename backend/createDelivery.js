const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User");

const deliveryAgents = [
    {
        name: "Rahul Kumar",
        email: "rahul@foodly.com",
        password: "Rahul@12345",
        phone: "9000000001",
        address: "Hyderabad",
        vehicleType: "Bike",
        vehicleNumber: "TS09AB1001"
    },
    {
        name: "Aman Singh",
        email: "aman@foodly.com",
        password: "Aman@12345",
        phone: "9000000002",
        address: "Hyderabad",
        vehicleType: "Bike",
        vehicleNumber: "TS09AB1002"
    },
    {
        name: "Arjun Yadav",
        email: "arjun@foodly.com",
        password: "Arjun@12345",
        phone: "9000000003",
        address: "Hyderabad",
        vehicleType: "Scooter",
        vehicleNumber: "TS09AB1003"
    }
];

const createDelivery = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB Connected Successfully!");

        for (const agent of deliveryAgents) {

            const existingDelivery = await User.findOne({
                email: agent.email
            });

            if (existingDelivery) {
                console.log(
                    `${agent.name} already exists.`
                );
                continue;
            }

            const hashedPassword = await bcrypt.hash(
                agent.password,
                10
            );

            const delivery = await User.create({
                name: agent.name,
                email: agent.email,
                password: hashedPassword,
                phone: agent.phone,
                address: agent.address,
                role: "delivery",
                deliveryStatus: "Available",
                vehicleType: agent.vehicleType,
                vehicleNumber: agent.vehicleNumber
            });

            console.log(
                `Delivery agent created: ${delivery.name}`
            );
            console.log(
                `Email: ${delivery.email}`
            );
            console.log(
                `Vehicle: ${delivery.vehicleType} - ${delivery.vehicleNumber}`
            );
            console.log("-------------------------");
        }

        console.log(
            "All delivery agents processed successfully!"
        );

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