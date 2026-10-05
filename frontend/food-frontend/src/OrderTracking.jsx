function OrderTracking({ status }) {
    const steps = [
        "Order Confirmed",
        "Preparing",
        "On the Way",
        "Delivered"
    ];

    const currentIndex = steps.indexOf(status);

    return (
        <div className="order-tracking">

            <div className="tracking-line">
                <div
                    className="tracking-progress"
                    style={{
                        width:
                            currentIndex >= 0
                                ? `${(currentIndex / (steps.length - 1)) * 100}%`
                                : "0%"
                    }}
                />
            </div>

            {steps.map((step, index) => (
                <div
                    className={`tracking-step ${
                        index <= currentIndex
                            ? "active"
                            : ""
                    }`}
                    key={step}
                >
                    <div className="tracking-dot">
                        {index < currentIndex
                            ? "✓"
                            : index === currentIndex
                            ? "●"
                            : ""}
                    </div>

                    <span>{step}</span>
                </div>
            ))}

        </div>
    );
}

export default OrderTracking;