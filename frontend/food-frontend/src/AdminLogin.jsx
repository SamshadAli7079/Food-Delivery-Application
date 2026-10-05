import { useState } from "react";
import "./AdminLogin.css";

function AdminLogin({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");
        setLoading(true);

        try {
            const response = await fetch(
                "http://localhost:5000/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Login failed"
                );
            }

            if (data.user.role !== "admin") {
                throw new Error(
                    "Access denied. Admin account required."
                );
            }

            localStorage.setItem(
                "foodDeliveryAdminToken",
                data.token
            );

            localStorage.setItem(
                "foodDeliveryAdmin",
                JSON.stringify(data.user)
            );

            onLogin(data.user);

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-login-page">

            <div className="admin-login-card">

                <div className="admin-login-icon">
                    🛡️
                </div>

                <h1>Foodly Admin</h1>

                <p className="admin-login-subtitle">
                    Sign in to manage your food delivery platform
                </p>

                {error && (
                    <div className="admin-error">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    <div className="admin-input-group">
                        <label>Email Address</label>

                        <input
                            type="email"
                            placeholder="Enter admin email"
                            value={email}
                            onChange={(event) =>
                                setEmail(event.target.value)
                            }
                            required
                        />
                    </div>

                    <div className="admin-input-group">
                        <label>Password</label>

                        <input
                            type="password"
                            placeholder="Enter admin password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="admin-login-button"
                        disabled={loading}
                    >
                        {loading
                            ? "Signing in..."
                            : "Sign In to Dashboard"}
                    </button>

                </form>

                <div className="admin-login-footer">
                    🔒 Authorized admin access only
                </div>

            </div>

        </div>
    );
}

export default AdminLogin;