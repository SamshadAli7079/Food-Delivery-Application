const express = require("express");
const jwt = require("jsonwebtoken");
const Order = require("../models/Order");

const router = express.Router();

// ==================== DELIVERY AUTH ====================

const verifyDelivery = (req, res, next) => {
    try {
        const authHeader =
            req.headers.authorization;

        if (
            !authHeader ||
            !authHeader.startsWith("Bearer ")
        ) {
            return res.status(401).json({
                message:
                    "Authentication required"
            });
        }

        const token =
            authHeader.split(" ")[1];

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        if (decoded.role !== "delivery") {
            return res.status(403).json({
                message:
                    "Delivery agent access required"
            });
        }

        req.deliveryAgent = decoded;

        next();

    } catch (error) {
        console.error(
            "Delivery Authentication Error:",
            error.message
        );

        return res.status(401).json({
            message:
                "Invalid or expired delivery token"
        });
    }
};

// ==================== GET ASSIGNED ORDERS ====================

router.get(
    "/orders",
    verifyDelivery,
    async (req, res) => {
        try {
            const orders =
                await Order.find({
                    deliveryAgentId:
                        req.deliveryAgent.userId
                })
                    .populate(
                        "userId",
                        "name email phone"
                    )
                    .sort({
                        createdAt: -1
                    });

            res.json({
                message:
                    "Assigned orders fetched successfully",
                orders
            });

        } catch (error) {
            console.error(
                "Delivery Orders Error:",
                error
            );

            res.status(500).json({
                message:
                    "Server error while fetching assigned orders"
            });
        }
    }
);
// ==================== UPDATE DELIVERY ORDER STATUS ====================

router.put(
    "/orders/:orderId/status",
    verifyDelivery,
    async (req, res) => {
        try {
            const { status } = req.body;

            const allowedStatuses = [
                "Order Confirmed",
                "Preparing",
                "On the Way",
                "Delivered"
            ];

            if (!allowedStatuses.includes(status)) {
                return res.status(400).json({
                    message:
                        "Invalid order status"
                });
            }

            const order =
                await Order.findOneAndUpdate(
                    {
                        _id: req.params.orderId,
                        deliveryAgentId:
                            req.deliveryAgent.userId
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
                    message:
                        "Assigned order not found"
                });
            }

            res.json({
                message:
                    "Order status updated successfully",
                order
            });

        } catch (error) {
            console.error(
                "Delivery Status Update Error:",
                error
            );

            res.status(500).json({
                message:
                    "Server error while updating order status"
            });
        }
    }
);

module.exports = router;