import { useEffect, useMemo, useState } from "react";
import "./DeliveryDashboard.css";

function DeliveryDashboard({
    deliveryAgent,
    onLogout
}) {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updatingOrder, setUpdatingOrder] = useState(null);

    useEffect(() => {
        fetchAssignedOrders();
    }, []);

    const fetchAssignedOrders = async () => {
        try {
            const token =
                localStorage.getItem(
                    "foodDeliveryToken"
                );

            const response = await fetch(
                "https://food-delivery-application-b2pl.onrender.com/api/delivery/orders",
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (response.ok) {
                setOrders(data.orders || []);
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error(
                "Delivery Orders Error:",
                error
            );
        } finally {
            setLoading(false);
        }
    };

    const updateOrderStatus = async (
        orderId,
        status
    ) => {
        try {
            setUpdatingOrder(orderId);

            const token =
                localStorage.getItem(
                    "foodDeliveryToken"
                );

            const response = await fetch(
                `https://food-delivery-application-b2pl.onrender.com/api/delivery/orders/${orderId}/status`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type":
                            "application/json",
                        Authorization:
                            `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        status
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(
                    data.message ||
                    "Status update failed"
                );
                return;
            }

            setOrders(
                (previousOrders) =>
                    previousOrders.map(
                        (order) =>
                            order._id === orderId
                                ? data.order
                                : order
                    )
            );
        } catch (error) {
            console.error(
                "Status Update Error:",
                error
            );

            alert(
                "Server error while updating status"
            );
        } finally {
            setUpdatingOrder(null);
        }
    };

    const totalOrders = orders.length;

    const activeOrders = useMemo(
        () =>
            orders.filter(
                (order) =>
                    order.status !==
                        "Delivered" &&
                    order.status !==
                        "Cancelled"
            ).length,
        [orders]
    );

    const deliveredOrders = useMemo(
        () =>
            orders.filter(
                (order) =>
                    order.status ===
                    "Delivered"
            ).length,
        [orders]
    );

    const getStatusClass = (status) => {
        if (status === "Order Confirmed") {
            return "confirmed";
        }

        if (status === "Preparing") {
            return "preparing";
        }

        if (status === "On the Way") {
            return "on-the-way";
        }

        if (status === "Delivered") {
            return "delivered";
        }

        return "";
    };

    const getStatusIcon = (status) => {
        if (status === "Order Confirmed") {
            return "✓";
        }

        if (status === "Preparing") {
            return "👨‍🍳";
        }

        if (status === "On the Way") {
            return "🚴";
        }

        if (status === "Delivered") {
            return "✓";
        }

        return "📦";
    };

    return (
        <div className="delivery-dashboard">
            {/* ================= HEADER ================= */}

            <header className="delivery-header">
                <div className="delivery-brand">
                    <div className="delivery-brand-icon">
                        🚴
                    </div>

                    <div>
                        <h1>Foodly</h1>
                        <span>
                            Delivery Partner
                        </span>
                    </div>
                </div>

                <div className="delivery-header-right">
                    <div className="agent-profile">
                        <div className="agent-avatar">
                            {deliveryAgent.name
                                ?.charAt(0)
                                .toUpperCase()}
                        </div>

                        <div className="agent-info">
                            <strong>
                                {deliveryAgent.name}
                            </strong>

                            <span>
                                Delivery Partner
                            </span>
                        </div>
                    </div>

                    <button
                        className="delivery-logout-btn"
                        onClick={onLogout}
                    >
                        <span>↪</span>
                        Logout
                    </button>
                </div>
            </header>

            {/* ================= MAIN ================= */}

            <main className="delivery-main">

                {/* Welcome Section */}

                <section className="delivery-welcome">
                    <div>
                        <span className="welcome-label">
                            Welcome back 👋
                        </span>

                        <h2>
                            Ready for your next delivery?
                        </h2>

                        <p>
                            Manage your assigned orders
                            and keep customers updated.
                        </p>
                    </div>

                    <div className="delivery-status-indicator">
                        <span className="status-dot"></span>
                        <span>
                            Available for Delivery
                        </span>
                    </div>
                </section>

                {/* ================= STATS ================= */}

                <section className="delivery-stats">

                    <div className="stat-card">
                        <div className="stat-icon total">
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
                        <div className="stat-icon active">
                            🚴
                        </div>

                        <div>
                            <span>
                                Active Deliveries
                            </span>

                            <strong>
                                {activeOrders}
                            </strong>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon completed">
                            ✓
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
                        <div className="stat-icon vehicle">
                            🛵
                        </div>

                        <div>
                            <span>
                                Vehicle
                            </span>

                            <strong>
                                {deliveryAgent.vehicleType ||
                                    "Bike"}
                            </strong>
                        </div>
                    </div>

                </section>

                {/* ================= ORDERS ================= */}

                <section className="orders-section">

                    <div className="section-heading">
                        <div>
                            <h2>
                                Assigned Orders
                            </h2>

                            <p>
                                Orders assigned to you
                            </p>
                        </div>

                        <div className="order-count">
                            {orders.length}{" "}
                            {orders.length === 1
                                ? "Order"
                                : "Orders"}
                        </div>
                    </div>

                    {loading ? (
                        <div className="delivery-loading">
                            <div className="loading-spinner"></div>

                            <p>
                                Loading your deliveries...
                            </p>
                        </div>
                    ) : orders.length === 0 ? (
                        <div className="empty-orders">
                            <div className="empty-icon">
                                📦
                            </div>

                            <h3>
                                No orders assigned yet
                            </h3>

                            <p>
                                New delivery assignments
                                will appear here.
                            </p>
                        </div>
                    ) : (
                        <div className="orders-grid">

                            {orders.map((order) => (
                                <article
                                    className="delivery-order-card"
                                    key={order._id}
                                >

                                    {/* Order Header */}

                                    <div className="order-card-header">

                                        <div>
                                            <span className="order-label">
                                                ORDER
                                            </span>

                                            <h3>
                                                #
                                                {order._id.slice(
                                                    -6
                                                ).toUpperCase()}
                                            </h3>
                                        </div>

                                        <div
                                            className={`order-status ${getStatusClass(
                                                order.status
                                            )}`}
                                        >
                                            <span>
                                                {getStatusIcon(
                                                    order.status
                                                )}
                                            </span>

                                            {order.status}
                                        </div>

                                    </div>

                                    {/* Customer */}

                                    <div className="customer-box">

                                        <div className="customer-avatar">
                                            {order.deliveryDetails?.name
                                                ?.charAt(0)
                                                .toUpperCase()}
                                        </div>

                                        <div>
                                            <span>
                                                Customer
                                            </span>

                                            <strong>
                                                {
                                                    order
                                                        .deliveryDetails
                                                        ?.name
                                                }
                                            </strong>
                                        </div>

                                    </div>

                                    {/* Delivery Information */}

                                    <div className="delivery-info">

                                        <div className="info-row">
                                            <div className="info-icon">
                                                📞
                                            </div>

                                            <div>
                                                <span>
                                                    Phone
                                                </span>

                                                <strong>
                                                    {
                                                        order
                                                            .deliveryDetails
                                                            ?.phone
                                                    }
                                                </strong>
                                            </div>
                                        </div>

                                        <div className="info-row">
                                            <div className="info-icon">
                                                📍
                                            </div>

                                            <div>
                                                <span>
                                                    Delivery Address
                                                </span>

                                                <strong>
                                                    {
                                                        order
                                                            .deliveryDetails
                                                            ?.address
                                                    }
                                                </strong>

                                                <small>
                                                    {
                                                        order
                                                            .deliveryDetails
                                                            ?.city
                                                    }
                                                    {" - "}
                                                    {
                                                        order
                                                            .deliveryDetails
                                                            ?.pincode
                                                    }
                                                </small>
                                            </div>
                                        </div>

                                    </div>

                                    {/* Order Items */}

                                    <div className="order-items">

                                        <div className="items-heading">
                                            <span>
                                                Order Items
                                            </span>

                                            <span>
                                                {order.items
                                                    ?.length ||
                                                    0}{" "}
                                                items
                                            </span>
                                        </div>

                                        {order.items?.map(
                                            (
                                                item,
                                                index
                                            ) => (
                                                <div
                                                    className="order-item"
                                                    key={
                                                        index
                                                    }
                                                >
                                                    <div className="item-left">
                                                        <span className="item-emoji">
                                                            {item.emoji ||
                                                                "🍽️"}
                                                        </span>

                                                        <div>
                                                            <strong>
                                                                {
                                                                    item.name
                                                                }
                                                            </strong>

                                                            <span>
                                                                Qty:{" "}
                                                                {
                                                                    item.quantity
                                                                }
                                                            </span>
                                                        </div>
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

                                    {/* Total */}

                                    <div className="order-total">

                                        <span>
                                            Total Amount
                                        </span>

                                        <strong>
                                            ₹
                                            {order.totalAmount}
                                        </strong>

                                    </div>

                                    {/* Status Update */}

                                    <div className="status-update">

                                        <label>
                                            Update Order Status
                                        </label>

                                        <select
                                            value={
                                                order.status
                                            }
                                            disabled={
                                                updatingOrder ===
                                                    order._id ||
                                                order.status ===
                                                    "Delivered"
                                            }
                                            onChange={(
                                                event
                                            ) =>
                                                updateOrderStatus(
                                                    order._id,
                                                    event
                                                        .target
                                                        .value
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
                                        </select>

                                        {updatingOrder ===
                                            order._id && (
                                            <span className="updating-text">
                                                Updating...
                                            </span>
                                        )}

                                    </div>

                                </article>
                            ))}

                        </div>
                    )}

                </section>

            </main>

            {/* ================= FOOTER ================= */}

            <footer className="delivery-footer">
                <span>
                    © 2026 Foodly Delivery
                </span>

                <span>
                    Delivering happiness, one order
                    at a time ❤️
                </span>
            </footer>

        </div>
    );
}

export default DeliveryDashboard;