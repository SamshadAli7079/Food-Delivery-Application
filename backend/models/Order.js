const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        deliveryAgentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
},

deliveryAssignedAt: {
    type: Date,
    default: null
},

        items: [
            {
                name: {
                    type: String,
                    required: true
                },

                restaurant: {
                    type: String,
                    required: true
                },

                price: {
                    type: Number,
                    required: true
                },

                quantity: {
                    type: Number,
                    required: true
                },

                emoji: {
                    type: String,
                    default: "🍽️"
                }
            }
        ],

        deliveryDetails: {
            name: {
                type: String,
                required: true
            },

            phone: {
                type: String,
                required: true
            },

            address: {
                type: String,
                required: true
            },

            city: {
                type: String,
                required: true
            },

            pincode: {
                type: String,
                required: true
            }
        },

        subtotal: {
            type: Number,
            required: true
        },

        deliveryFee: {
            type: Number,
            default: 40
        },

        totalAmount: {
            type: Number,
            required: true
        },

        status: {
            type: String,
            enum: [
                "Order Confirmed",
                "Preparing",
                "On the Way",
                "Delivered",
                "Cancelled"
            ],
            default: "Order Confirmed"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Order", orderSchema);