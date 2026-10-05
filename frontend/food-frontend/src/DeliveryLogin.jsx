import { useState } from "react";
import "./DeliveryLogin.css";

function DeliveryLogin({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (event) => {
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
                setError(
                    data.message ||
                    "Login failed"
                );
                setLoading(false);
                return;
            }

            if (data.user.role !== "delivery") {
                setError(
                    "Delivery agent access required"
                );
                setLoading(false);
                return;
            }

            localStorage.setItem(
                "foodDeliveryToken",
                data.token
            );

            localStorage.setItem(
                "foodDeliveryUser",
                JSON.stringify(data.user)
            );

            onLogin(data.user);

        } catch (error) {
            console.error(
                "Delivery Login Error:",
                error
            );

            setError(
                "Unable to connect to server"
            );
        }

        setLoading(false);
    };

    return (
        <div className="delivery-login-page">

            <div className="delivery-login-card">

                <div className="delivery-login-icon">
                    🚴
                </div>

                <h1>Foodly Delivery</h1>

                <p>
                    Delivery Partner Login
                </p>

                {error && (
                    <div className="delivery-login-error">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin}>

                    <div className="delivery-input-group">
                        <label>
                            Email Address
                        </label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(event) =>
                                setEmail(
                                    event.target.value
                                )
                            }
                            required
                        />
                    </div>

                    <div className="delivery-input-group">
                        <label>
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(event) =>
                                setPassword(
                                    event.target.value
                                )
                            }
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Signing In..."
                            : "Sign In"}
                    </button>

                </form>

            </div>

        </div>
    );
}

export default DeliveryLogin;