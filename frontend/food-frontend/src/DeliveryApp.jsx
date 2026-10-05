import { useState } from "react";
import DeliveryLogin from "./DeliveryLogin";
import DeliveryDashboard from "./DeliveryDashboard";

function DeliveryApp() {
    const [deliveryAgent, setDeliveryAgent] =
        useState(() => {
            const savedUser =
                localStorage.getItem(
                    "foodDeliveryUser"
                );

            if (!savedUser) {
                return null;
            }

            const user = JSON.parse(savedUser);

            return user.role === "delivery"
                ? user
                : null;
        });

    const handleLogin = (user) => {
        setDeliveryAgent(user);
    };

    const handleLogout = () => {
        localStorage.removeItem(
            "foodDeliveryToken"
        );

        localStorage.removeItem(
            "foodDeliveryUser"
        );

        setDeliveryAgent(null);
    };

    if (!deliveryAgent) {
        return (
            <DeliveryLogin
                onLogin={handleLogin}
            />
        );
    }

return (
    <DeliveryDashboard
        deliveryAgent={deliveryAgent}
        onLogout={handleLogout}
    />
);
}

export default DeliveryApp;