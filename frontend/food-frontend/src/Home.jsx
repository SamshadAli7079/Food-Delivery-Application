import "./Home.css";

function Home({ onUserLogin, onDeliveryLogin, onAdminLogin }) {
    return (
        <div className="home-page">

            {/* Navigation */}
            <nav className="home-navbar">
                <div className="home-logo">
                    🍔 <span>Foodly</span>
                </div>

<div className="home-nav-links">
    <a href="#home">Home</a>

    <a href="#about">About</a>

    <a href="#restaurants">Restaurants</a>

    <button
        className="user-login-nav"
        onClick={onUserLogin}
    >
        👤 User Login
    </button>

    <button
        className="delivery-login-nav"
        onClick={onDeliveryLogin}
    >
        🚴 Delivery Agent Login
    </button>

    <button
        className="admin-login-nav"
        onClick={onAdminLogin}
    >
        🛡️ Admin Login
    </button>
</div>
            </nav>

            {/* Hero Section */}
            <section className="home-hero" id="home">

                <div className="hero-content">
                    <span className="hero-badge">
                        🍽️ Delicious food at your doorstep
                    </span>

                    <h1>
                        Your Favorite Food,
                        <br />
                        <span>Delivered Fast.</span>
                    </h1>

                    <p>
                        Discover the best restaurants around you,
                        order your favorite meals and enjoy fast
                        doorstep delivery with Foodly.
                    </p>

                    <div className="hero-buttons">
                        <button
                            className="primary-button"
                            onClick={onUserLogin}
                        >
                            Order Food 🍔
                        </button>

                        <a
                            href="#restaurants"
                            className="secondary-button"
                        >
                            Explore Restaurants
                        </a>
                    </div>
                </div>

                <div className="hero-food">
                    <div className="food-circle">
                        🍕
                    </div>

                    <div className="floating-food food-one">
                        🍔
                    </div>

                    <div className="floating-food food-two">
                        🍟
                    </div>

                    <div className="floating-food food-three">
                        🥤
                    </div>
                </div>

            </section>

            {/* About Section */}
            <section className="home-section" id="about">
                <h2>Why Choose Foodly?</h2>

                <p className="section-subtitle">
                    Everything you need for a simple and enjoyable
                    food delivery experience.
                </p>

                <div className="feature-grid">

                    <div className="feature-card">
                        <div>🍕</div>
                        <h3>Wide Food Selection</h3>
                        <p>
                            Choose from pizzas, burgers, biryani,
                            Chinese food, desserts and drinks.
                        </p>
                    </div>

                    <div className="feature-card">
                        <div>⚡</div>
                        <h3>Fast Delivery</h3>
                        <p>
                            Get your favorite food delivered quickly
                            right to your doorstep.
                        </p>
                    </div>

                    <div className="feature-card">
                        <div>🔒</div>
                        <h3>Secure Ordering</h3>
                        <p>
                            Easy and secure ordering with real-time
                            order status tracking.
                        </p>
                    </div>

                </div>
            </section>

            {/* Restaurants Section */}
            <section className="home-section restaurants-section" id="restaurants">
                <h2>Popular Restaurants</h2>

                <p className="section-subtitle">
                    Explore delicious food from our popular restaurants.
                </p>

                <div className="restaurant-grid">

                    <div className="restaurant-card">
                        <div className="restaurant-image">🍛</div>
                        <h3>Spice Garden</h3>
                        <p>Indian • Biryani • Chinese</p>
                        <span>⭐ 4.8</span>
                    </div>

                    <div className="restaurant-card">
                        <div className="restaurant-image">🍕</div>
                        <h3>Urban Pizza</h3>
                        <p>Pizza • Italian • Fast Food</p>
                        <span>⭐ 4.7</span>
                    </div>

                    <div className="restaurant-card">
                        <div className="restaurant-image">🍔</div>
                        <h3>Burger House</h3>
                        <p>Burgers • Fries • Drinks</p>
                        <span>⭐ 4.6</span>
                    </div>

                </div>
            </section>

            {/* Footer */}
            <footer className="home-footer">
                <h2>🍔 Foodly</h2>
                <p>
                    Delicious food. Fast delivery. Happy customers.
                </p>
                <p className="copyright">
                    © 2026 Foodly. All rights reserved.
                </p>
            </footer>

        </div>
    );
}

export default Home;