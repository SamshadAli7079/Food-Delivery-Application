const express = require("express");
const jwt = require("jsonwebtoken");
const Order = require("../models/Order");

const router = express.Router();

// ==================== ADMIN AUTH ====================

const verifyAdmin = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (
            !authHeader ||
            !authHeader.startsWith("Bearer ")
        ) {
            return res.status(401).json({
                message: "Authentication required"
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        if (decoded.role !== "admin") {
            return res.status(403).json({
                message: "Admin access required"
            });
        }

        req.admin = decoded;

        next();

    } catch (error) {
        console.error(
            "Admin Authentication Error:",
            error.message
        );

        return res.status(401).json({
            message: "Invalid or expired admin token"
        });
    }
};

// ==================== GET ALL ORDERS ====================

router.get("/orders", verifyAdmin, async (req, res) => {
    try {
const orders = await Order.find()
    .populate(
        "userId",
        "name email phone"
    )
    .populate(
        "deliveryAgentId",
        "name email phone vehicleType vehicleNumber"
    )
    .sort({
        createdAt: -1
    });

        res.json({
            message: "Orders fetched successfully",
            orders
        });

    } catch (error) {
        console.error(
            "Admin Orders Error:",
            error
        );

        res.status(500).json({
            message:
                "Server error while fetching orders"
        });
    }
});

// ==================== UPDATE ORDER STATUS ====================

router.put(
    "/orders/:orderId/status",
    verifyAdmin,
    async (req, res) => {
        try {
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

            const order =
                await Order.findByIdAndUpdate(
                    req.params.orderId,
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
                message:
                    "Order status updated successfully",
                order
            });

        } catch (error) {
            console.error(
                "Admin Status Update Error:",
                error
            );

            res.status(500).json({
                message:
                    "Server error while updating order status"
            });
        }
    }
);
// ==================== GET DELIVERY AGENTS ====================

router.get("/delivery-agents", verifyAdmin, async (req, res) => {
    try {
        const deliveryAgents = await require("../models/User").find(
            {
                role: "delivery"
            }
        ).select(
            "name email phone deliveryStatus vehicleType vehicleNumber"
        );

        res.json({
            message: "Delivery agents fetched successfully",
            deliveryAgents
        });

    } catch (error) {
        console.error(
            "Delivery Agents Error:",
            error
        );

        res.status(500).json({
            message:
                "Server error while fetching delivery agents"
        });
    }
});
// ==================== ASSIGN DELIVERY AGENT ====================

router.put(
    "/orders/:orderId/assign-delivery",
    verifyAdmin,
    async (req, res) => {
        try {
            const { deliveryAgentId } = req.body;

            if (!deliveryAgentId) {
                return res.status(400).json({
                    message:
                        "Delivery agent ID is required"
                });
            }

            const User = require("../models/User");

            const deliveryAgent =
                await User.findOne({
                    _id: deliveryAgentId,
                    role: "delivery"
                });

            if (!deliveryAgent) {
                return res.status(404).json({
                    message:
                        "Delivery agent not found"
                });
            }

            const order =
                await Order.findByIdAndUpdate(
                    req.params.orderId,
                    {
                        deliveryAgentId:
                            deliveryAgent._id,
                        deliveryAssignedAt:
                            new Date()
                    },
                    {
                        new: true
                    }
                ).populate(
                    "deliveryAgentId",
                    "name email phone deliveryStatus vehicleType vehicleNumber"
                );

            if (!order) {
                return res.status(404).json({
                    message: "Order not found"
                });
            }

            res.json({
                message:
                    "Delivery agent assigned successfully",
                order
            });

        } catch (error) {
            console.error(
                "Assign Delivery Error:",
                error
            );

            res.status(500).json({
                message:
                    "Server error while assigning delivery agent"
            });
        }
    }
);
module.exports = router;