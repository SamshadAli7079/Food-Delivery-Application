const express = require("express");
const jwt = require("jsonwebtoken");
const Order = require("../models/Order");

const router = express.Router();

// ==================== CREATE ORDER ====================

router.post("/", async (req, res) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Authentication required"
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const {
            items,
            deliveryDetails,
            subtotal,
            deliveryFee,
            totalAmount
        } = req.body;

        if (
            !items ||
            items.length === 0 ||
            !deliveryDetails ||
            !subtotal ||
            !totalAmount
        ) {
            return res.status(400).json({
                message: "Invalid order details"
            });
        }

        const order = await Order.create({
            userId: decoded.userId,
            items,
            deliveryDetails,
            subtotal,
            deliveryFee: deliveryFee || 40,
            totalAmount
        });

        res.status(201).json({
            message: "Order created successfully",
            order
        });

    } catch (error) {
        console.error("Create Order Error:", error);

        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({
                message: "Invalid authentication token"
            });
        }

        res.status(500).json({
            message: "Server error while creating order"
        });
    }
});


// ==================== GET MY ORDERS ====================

router.get("/my-orders", async (req, res) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Authentication required"
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const orders = await Order.find({
            userId: decoded.userId
        }).sort({
            createdAt: -1
        });

        res.json({
            orders
        });

    } catch (error) {
        console.error("Get Orders Error:", error);

        res.status(500).json({
            message: "Server error while fetching orders"
        });
    }
});


// ==================== UPDATE ORDER STATUS ====================

router.put("/:orderId/status", async (req, res) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Authentication required"
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const { status } = req.body;

        const allowedStatuses = [
            "Order Confirmed",
            "Preparing",
            "On the Way",
            "Delivered",
            "Cancelled"
        ];

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                message: "Invalid order status"
            });
        }

        const order = await Order.findOneAndUpdate(
            {
                _id: req.params.orderId,
                userId: decoded.userId
            },
            {
                status
            },
            {
                new: true
            }
        );

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        res.json({
            message: "Order status updated successfully",
            order
        });

    } catch (error) {
        console.error("Update Order Status Error:", error);

        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({
                message: "Invalid authentication token"
            });
        }

        res.status(500).json({
            message: "Server error while updating order status"
        });
    }
});
module.exports = router;