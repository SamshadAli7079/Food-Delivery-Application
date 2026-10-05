import { useState } from "react";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";

function AdminApp() {
    const [admin, setAdmin] = useState(() => {
        const savedAdmin = localStorage.getItem(
            "foodDeliveryAdmin"
        );

        return savedAdmin
            ? JSON.parse(savedAdmin)
            : null;
    });

    const handleAdminLogin = (loggedInAdmin) => {
        setAdmin(loggedInAdmin);
    };

    const handleAdminLogout = () => {
        localStorage.removeItem(
            "foodDeliveryAdminToken"
        );

        localStorage.removeItem(
            "foodDeliveryAdmin"
        );

        setAdmin(null);
    };

    if (!admin) {
        return (
            <AdminLogin
                onLogin={handleAdminLogin}
            />
        );
    }

    return (
        <AdminDashboard
            admin={admin}
            onLogout={handleAdminLogout}
        />
    );
}

export default AdminApp;