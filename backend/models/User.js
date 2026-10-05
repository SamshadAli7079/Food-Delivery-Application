const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: true
        },

        phone: {
            type: String,
            default: ""
        },

        address: {
            type: String,
            default: ""
        },

role: {
    type: String,
    enum: ["customer", "admin", "delivery"],
    default: "customer"
},

deliveryStatus: {
    type: String,
    enum: ["Available", "Busy", "Offline"],
    default: "Offline"
},

vehicleType: {
    type: String,
    default: ""
},

vehicleNumber: {
    type: String,
    default: ""
}
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("User", userSchema);