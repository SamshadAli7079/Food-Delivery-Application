import { useEffect, useState } from "react";
import "./MyOrders.css";
import OrderTracking from "./OrderTracking";

function MyOrders({ onBack }) {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem("foodDeliveryToken");

            if (!token) {
                setError("Please login again.");
                setLoading(false);
                return;
            }

            const response = await fetch(
                "http://localhost:5000/api/orders/my-orders",
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to fetch orders"
                );
            }

            setOrders(data.orders || []);

        } catch (error) {
            console.error("Fetch Orders Error:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="my-orders-page">
            <div className="my-orders-container">

                <button
                    className="back-button"
                    onClick={onBack}
                >
                    ← Back to Restaurants
                </button>

                <div className="my-orders-heading">
                    <span className="section-label">
                        ORDER HISTORY
                    </span>

                    <h1>My Orders</h1>

                    <p>
                        Track your previous food orders and
                        delivery status.
                    </p>
                </div>

                {loading && (
                    <div className="orders-message">
                        Loading your orders...
                    </div>
                )}

                {!loading && error && (
                    <div className="orders-message error">
                        {error}
                    </div>
                )}

                {!loading &&
                    !error &&
                    orders.length === 0 && (
                        <div className="orders-message">
                            <div className="empty-orders-icon">
                                🍽️
                            </div>

                            <h2>No orders yet</h2>

                            <p>
                                Your previous orders will appear
                                here.
                            </p>
                        </div>
                    )}

                {!loading &&
                    !error &&
                    orders.length > 0 && (
                        <div className="orders-list">
                            {orders.map((order) => (
                                <div
                                    className="order-card"
                                    key={order._id}
                                >
                                    <div className="order-card-top">
                                        <div>
                                            <span>
                                                ORDER ID
                                            </span>

                                            <strong>
                                                #{order._id.slice(-8)}
                                            </strong>
                                            <small>
    {new Date(order.createdAt).toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short"
    })}
</small>
                                        </div>

                                        <div className="order-status">
                                            {order.status}
                                        </div>
                                    </div>
<OrderTracking status={order.status} />
                                    <div className="order-items">
                                        {order.items.map(
                                            (item, index) => (
                                                <div
                                                    className="order-item"
                                                    key={`${order._id}-${index}`}
                                                >
                                                    <div className="order-item-icon">
                                                        {item.emoji}
                                                    </div>

                                                    <div>
                                                        <h3>
    {item.name}
</h3>

<p className="order-restaurant">
    {item.restaurant}
</p>

<p>
    {item.quantity} × ₹
    {item.price}
</p>
                                                    </div>

                                                    <strong>
                                                        ₹
                                                        {item.price *
                                                            item.quantity}
                                                    </strong>
                                                </div>
                                            )
                                        )}
                                    </div>

<div className="order-card-bottom">

    <div className="delivery-address">
        <span>DELIVER TO</span>

        <strong>
            {order.deliveryDetails.name}
        </strong>

        <p>
            {order.deliveryDetails.address},{" "}
            {order.deliveryDetails.city} -{" "}
            {order.deliveryDetails.pincode}
        </p>

        <small>
            📞 {order.deliveryDetails.phone}
        </small>
    </div>

    <div className="order-total">
        <span>Total Amount</span>

        <strong>
            ₹{order.totalAmount}
        </strong>
    </div>

</div>
                                </div>
                            ))}
                        </div>
                    )}

            </div>
        </section>
    );
}

export default MyOrders;