import { useState } from "react";
import "./AuthPage.css";

const API_BASE_URL = "https://food-delivery-application-b2pl.onrender.com";

function AuthPage({ onLogin }) {
    const [isLogin, setIsLogin] = useState(true);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: ""
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });

        setMessage("");
        setError("");
    };

    const switchMode = () => {
        setIsLogin(!isLogin);

        setFormData({
            name: "",
            email: "",
            password: "",
            phone: "",
            address: ""
        });

        setMessage("");
        setError("");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setLoading(true);
        setMessage("");
        setError("");

        try {
            const endpoint = isLogin
                ? "/api/auth/login"
                : "/api/auth/register";

            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
                    isLogin
                        ? {
                              email: formData.email,
                              password: formData.password
                          }
                        : formData
                )
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Something went wrong");
            }

            if (isLogin) {
                localStorage.setItem("foodDeliveryToken", data.token);
                localStorage.setItem(
                    "foodDeliveryUser",
                    JSON.stringify(data.user)
                );

                setMessage("Login successful!");

                setTimeout(() => {
                    onLogin(data.user);
                }, 700);
            } else {
                setMessage("Registration successful! Please login.");

                setTimeout(() => {
                    setIsLogin(true);

                    setFormData({
                        name: "",
                        email: formData.email,
                        password: "",
                        phone: "",
                        address: ""
                    });
                }, 900);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-background-circle circle-one"></div>
            <div className="auth-background-circle circle-two"></div>

            <div className={`auth-container ${isLogin ? "login-mode" : "register-mode"}`}>

                {/* Left Branding Section */}
                <div className="auth-brand">
                    <div className="auth-brand-icon">🍔</div>

                    <h1>Foodie<span>Go</span></h1>

                    <p>
                        Delicious food delivered
                        <br />
                        right to your doorstep.
                    </p>

                    <div className="auth-benefits">
                        <div>
                            <span>✓</span>
                            Fresh & delicious food
                        </div>

                        <div>
                            <span>✓</span>
                            Fast home delivery
                        </div>

                        <div>
                            <span>✓</span>
                            Easy & secure ordering
                        </div>
                    </div>
                </div>

                {/* Form Section */}
                <div className="auth-form-section">

                    <div className="auth-form-header">
                        <h2>
                            {isLogin
                                ? "Welcome back!"
                                : "Create your account"}
                        </h2>

                        <p>
                            {isLogin
                                ? "Login to continue ordering your favorite food."
                                : "Join us and start ordering delicious food."}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="auth-form">

                        {!isLogin && (
                            <div className="auth-field">
                                <label>Full Name</label>

                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter your full name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}

                        <div className="auth-field">
                            <label>Email Address</label>

                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {!isLogin && (
                            <div className="auth-form-row">

                                <div className="auth-field">
                                    <label>Phone</label>

                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Phone number"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="auth-field">
                                    <label>Address</label>

                                    <input
                                        type="text"
                                        name="address"
                                        placeholder="City / Area"
                                        value={formData.address}
                                        onChange={handleChange}
                                    />
                                </div>

                            </div>
                        )}

                        <div className="auth-field">
                            <label>Password</label>

                            <input
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {error && (
                            <div className="auth-message auth-error">
                                {error}
                            </div>
                        )}

                        {message && (
                            <div className="auth-message auth-success">
                                {message}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="auth-submit-button"
                            disabled={loading}
                        >
                            {loading
                                ? "Please wait..."
                                : isLogin
                                ? "Login →"
                                : "Create Account →"}
                        </button>

                    </form>

                    <div className="auth-switch">
                        <span>
                            {isLogin
                                ? "Don't have an account?"
                                : "Already have an account?"}
                        </span>

                        <button
                            type="button"
                            onClick={switchMode}
                        >
                            {isLogin ? "Create Account" : "Login"}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default AuthPage;