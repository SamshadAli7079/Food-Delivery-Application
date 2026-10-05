import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AdminApp from "./AdminApp.jsx";
import DeliveryApp from "./DeliveryApp.jsx";

const isAdminPage = window.location.pathname === "/admin";
const isDeliveryPage =
    window.location.pathname === "/delivery";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        {
    isAdminPage ? (
        <AdminApp />
    ) : isDeliveryPage ? (
        <DeliveryApp />
    ) : (
        <App />
    )
}
    </StrictMode>
);