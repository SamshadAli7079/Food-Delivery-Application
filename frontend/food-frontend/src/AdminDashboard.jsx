import { useEffect, useState } from "react";
import "./AdminDashboard.css";

function AdminDashboard({ admin, onLogout }) {
    const [orders, setOrders] = useState([]);
    const [deliveryAgents, setDeliveryAgents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchOrders = async () => {
        try {
            setLoading(true);
            setError("");

            const token = localStorage.getItem(
                "foodDeliveryAdminToken"
            );

            const response = await fetch(
                "http://localhost:5000/api/admin/orders",
                {
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
            console.error(
                "Admin Orders Error:",
                error
            );

            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const updateOrderStatus = async (
    orderId,
    newStatus
) => {
    try {
        const token = localStorage.getItem(
            "foodDeliveryAdminToken"
        );

        const response = await fetch(
            `http://localhost:5000/api/admin/orders/${orderId}/status`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    status: newStatus
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.message ||
                "Failed to update order status"
            );
        }

        setOrders((currentOrders) =>
            currentOrders.map((order) =>
                order._id === orderId
                    ? {
                          ...order,
                          status: data.order.status
                      }
                    : order
            )
        );

    } catch (error) {
        console.error(
            "Status Update Error:",
            error
        );

        alert(
            error.message ||
            "Failed to update order status"
        );
    }
};
const assignDeliveryAgent = async (
    orderId,
    deliveryAgentId
) => {
    try {
        const token = localStorage.getItem(
            "foodDeliveryAdminToken"
        );

        const response = await fetch(
            `http://localhost:5000/api/admin/orders/${orderId}/assign-delivery`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    deliveryAgentId
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            alert(
                data.message ||
                "Delivery agent assignment failed"
            );
            return;
        }

        setOrders((previousOrders) =>
            previousOrders.map((order) =>
                order._id === orderId
                    ? data.order
                    : order
            )
        );

        alert(
            "Delivery agent assigned successfully!"
        );

    } catch (error) {
        console.error(
            "Assign Delivery Error:",
            error
        );

        alert(
            "Server error while assigning delivery agent"
        );
    }
};
    useEffect(() => {
        fetchOrders();
    }, []);
    useEffect(() => {
    const fetchDeliveryAgents = async () => {
        try {
            const token = localStorage.getItem(
                "foodDeliveryAdminToken"
            );

            const response = await fetch(
                "http://localhost:5000/api/admin/delivery-agents",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (response.ok) {
                setDeliveryAgents(
                    data.deliveryAgents || []
                );
            }

        } catch (error) {
            console.error(
                "Delivery Agents Fetch Error:",
                error
            );
        }
    };

    fetchDeliveryAgents();
}, []);

    const totalOrders = orders.length;

    const deliveredOrders = orders.filter(
        (order) =>
            order.status === "Delivered"
    ).length;

    const pendingOrders = orders.filter(
        (order) =>
            order.status === "Order Confirmed" ||
            order.status === "Preparing" ||
            order.status === "On the Way"
    ).length;

    const totalRevenue = orders
        .filter(
            (order) =>
                order.status !== "Cancelled"
        )
        .reduce(
            (total, order) =>
                total + order.totalAmount,
            0
        );

    return (
        <div className="admin-dashboard">

            <header className="admin-header">

                <div className="admin-brand">
                    <div className="admin-brand-icon">
                        🍔
                    </div>

                    <div>
                        <h1>Foodly Admin</h1>
                        <span>
                            Management Dashboard
                        </span>
                    </div>
                </div>

                <div className="admin-profile">

                    <div className="admin-profile-info">
                        <strong>
                            {admin.name}
                        </strong>

                        <span>
                            Administrator
                        </span>
                    </div>

                    <button
                        className="admin-logout"
                        onClick={onLogout}
                    >
                        Logout
                    </button>

                </div>

            </header>

            <main className="admin-content">

                <div className="admin-welcome">
                    <div>
                        <span>
                            ADMIN PANEL
                        </span>

                        <h2>
                            Welcome back, {admin.name} 👋
                        </h2>

                        <p>
                            Monitor orders and manage
                            your Foodly platform.
                        </p>
                    </div>

                    <button
                        className="refresh-button"
                        onClick={fetchOrders}
                    >
                        ↻ Refresh
                    </button>
                </div>

                <section className="admin-stats">

                    <div className="stat-card">
                        <div className="stat-icon">
                            📦
                        </div>

                        <div>
                            <span>
                                Total Orders
                            </span>

                            <strong>
                                {totalOrders}
                            </strong>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">
                            ⏳
                        </div>

                        <div>
                            <span>
                                Active Orders
                            </span>

                            <strong>
                                {pendingOrders}
                            </strong>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">
                            ✅
                        </div>

                        <div>
                            <span>
                                Delivered
                            </span>

                            <strong>
                                {deliveredOrders}
                            </strong>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">
                            ₹
                        </div>

                        <div>
                            <span>
                                Revenue
                            </span>

                            <strong>
                                ₹{totalRevenue}
                            </strong>
                        </div>
                    </div>

                </section>

                <section className="admin-orders-section">

                    <div className="section-heading">

                        <div>
                            <h2>
                                Recent Orders
                            </h2>

                            <p>
                                Manage customer orders
                                and delivery status.
                            </p>
                        </div>

                        <span className="order-count">
                            {orders.length} Orders
                        </span>

                    </div>

                    {loading && (
                        <div className="admin-loading">
                            <div className="loading-spinner"></div>

                            <p>
                                Loading orders...
                            </p>
                        </div>
                    )}

                    {!loading && error && (
                        <div className="admin-error-box">
                            <strong>
                                Unable to load orders
                            </strong>

                            <p>
                                {error}
                            </p>

                            <button
                                onClick={fetchOrders}
                            >
                                Try Again
                            </button>
                        </div>
                    )}

                    {!loading &&
                        !error &&
                        orders.length === 0 && (
                            <div className="admin-empty">
                                <div>
                                    📦
                                </div>

                                <h3>
                                    No orders yet
                                </h3>

                                <p>
                                    Customer orders will
                                    appear here.
                                </p>
                            </div>
                        )}

                    {!loading &&
                        !error &&
                        orders.length > 0 && (
                            <div className="admin-orders-list">

                                {orders.map(
                                    (order) => (
                                        <div
                                            className="admin-order-card"
                                            key={order._id}
                                        >

                                            <div className="admin-order-top">

                                                <div>
                                                    <span>
                                                        ORDER ID
                                                    </span>

                                                    <strong>
                                                        #{order._id.slice(-8)}
                                                    </strong>

                                                    <small>
                                                        {new Date(
                                                            order.createdAt
                                                        ).toLocaleString(
                                                            "en-IN",
                                                            {
                                                                dateStyle:
                                                                    "medium",
                                                                timeStyle:
                                                                    "short"
                                                            }
                                                        )}
                                                    </small>
                                                </div>

                                     <select
    className={`admin-status-select ${order.status
        .toLowerCase()
        .replace(/ /g, "-")}`}
    value={order.status}
    onChange={(event) =>
        updateOrderStatus(
            order._id,
            event.target.value
        )
    }
>
    <option value="Order Confirmed">
        Order Confirmed
    </option>

    <option value="Preparing">
        Preparing
    </option>

    <option value="On the Way">
        On the Way
    </option>

    <option value="Delivered">
        Delivered
    </option>

    <option value="Cancelled">
        Cancelled
    </option>
</select>
<div className="delivery-assignment">
    <select
        value={order.deliveryAgentId?._id || ""}
        onChange={(event) =>
            assignDeliveryAgent(
                order._id,
                event.target.value
            )
        }
    >
        <option value="">
            Assign Delivery Agent
        </option>

        {deliveryAgents.map((agent) => (
            <option
                key={agent._id}
                value={agent._id}
            >
                {agent.name} - {agent.vehicleNumber}
            </option>
        ))}
    </select>
</div>


                                            </div>

                                            <div className="admin-order-body">

                                                <div className="admin-customer">

                                                    <span>
                                                        CUSTOMER
                                                    </span>

                                                    <strong>
                                                        {order.deliveryDetails.name}
                                                    </strong>

                                                    <p>
                                                        📞{" "}
                                                        {
                                                            order
                                                                .deliveryDetails
                                                                .phone
                                                        }
                                                    </p>

                                                    <p>
                                                        📍{" "}
                                                        {
                                                            order
                                                                .deliveryDetails
                                                                .address
                                                        }
                                                        ,{" "}
                                                        {
                                                            order
                                                                .deliveryDetails
                                                                .city
                                                        }{" "}
                                                        -{" "}
                                                        {
                                                            order
                                                                .deliveryDetails
                                                                .pincode
                                                        }
                                                    </p>

                                                </div>

                                                <div className="admin-order-items">

                                                    <span>
                                                        ITEMS
                                                    </span>

                                                    {order.items.map(
                                                        (
                                                            item,
                                                            index
                                                        ) => (
                                                            <p
                                                                key={
                                                                    `${order._id}-${index}`
                                                                }
                                                            >
                                                                {
                                                                    item.emoji
                                                                }{" "}
                                                                {
                                                                    item.name
                                                                }{" "}
                                                                ×{" "}
                                                                {
                                                                    item.quantity
                                                                }
                                                            </p>
                                                        )
                                                    )}

                                                </div>

                                                <div className="admin-order-total">

                                                    <span>
                                                        TOTAL
                                                    </span>

                                                    <strong>
                                                        ₹
                                                        {
                                                            order.totalAmount
                                                        }
                                                    </strong>

                                                </div>

                                            </div>

                                        </div>
                                    )
                                )}

                            </div>
                        )}

                </section>

            </main>

        </div>
    );
}

export default AdminDashboard;