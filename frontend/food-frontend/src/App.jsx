import { useState } from "react";
import "./App.css";
import AuthPage from "./AuthPage";
import MyOrders from "./MyOrders";
import Home from "./Home";

const categories = [
  { name: "Pizza", emoji: "🍕" },
  { name: "Burgers", emoji: "🍔" },
  { name: "Biryani", emoji: "🍛" },
  { name: "Chinese", emoji: "🥡" },
  { name: "Desserts", emoji: "🍰" },
  { name: "Drinks", emoji: "🥤" },
];

const restaurants = [
  {
    name: "Spice Garden",
    cuisine: "Indian • Biryani • North Indian",
    rating: "4.8",
    time: "25–30 min",
    price: "₹₹",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80",
    menu: [
      {
        name: "Chicken Biryani",
        description: "Aromatic basmati rice with tender chicken and authentic spices.",
        price: 249,
        emoji: "🍛",
      },
      {
        name: "Paneer Butter Masala",
        description: "Soft paneer cooked in a rich and creamy tomato gravy.",
        price: 219,
        emoji: "🥘",
      },
      {
        name: "Butter Naan",
        description: "Soft tandoori naan finished with delicious butter.",
        price: 49,
        emoji: "🫓",
      },
      {
        name: "Chicken Tikka",
        description: "Juicy chicken pieces marinated with aromatic Indian spices.",
        price: 229,
        emoji: "🍗",
      },
      {
        name: "Mutton Biryani",
        description: "Flavorful basmati rice cooked with tender mutton and spices.",
        price: 329,
        emoji: "🍖",
      },
      {
        name: "Dal Tadka",
        description: "Yellow lentils tempered with garlic, cumin and Indian spices.",
        price: 149,
        emoji: "🍲",
      },
    ],
  },

  {
    name: "Urban Pizza",
    cuisine: "Pizza • Italian • Fast Food",
    rating: "4.7",
    time: "20–25 min",
    price: "₹₹",
    image:
      "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=900&q=80",
    menu: [
      {
        name: "Margherita Pizza",
        description: "Classic pizza with tomato sauce, mozzarella and fresh herbs.",
        price: 199,
        emoji: "🍕",
      },
      {
        name: "Farmhouse Pizza",
        description: "Loaded with fresh vegetables, cheese and Italian herbs.",
        price: 279,
        emoji: "🍕",
      },
      {
        name: "Chicken Pepperoni Pizza",
        description: "Cheesy pizza topped with delicious chicken pepperoni.",
        price: 329,
        emoji: "🍕",
      },
      {
        name: "Garlic Bread",
        description: "Crispy garlic bread with a buttery cheesy topping.",
        price: 129,
        emoji: "🥖",
      },
      {
        name: "Cheese Burst Pizza",
        description: "Extra cheesy pizza with a delicious cheese-filled crust.",
        price: 349,
        emoji: "🧀",
      },
      {
        name: "Pasta Alfredo",
        description: "Creamy Italian pasta tossed with herbs and parmesan cheese.",
        price: 229,
        emoji: "🍝",
      },
    ],
  },

  {
    name: "Burger House",
    cuisine: "Burgers • American • Fast Food",
    rating: "4.6",
    time: "20–30 min",
    price: "₹₹",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80",
    menu: [
      {
        name: "Classic Chicken Burger",
        description: "Crispy chicken patty with fresh lettuce and signature sauce.",
        price: 179,
        emoji: "🍔",
      },
      {
        name: "Cheese Burger",
        description: "Juicy burger loaded with melted cheese and special sauce.",
        price: 199,
        emoji: "🍔",
      },
      {
        name: "Double Chicken Burger",
        description: "Two crispy chicken patties for a seriously filling meal.",
        price: 279,
        emoji: "🍔",
      },
      {
        name: "French Fries",
        description: "Golden crispy fries seasoned to perfection.",
        price: 99,
        emoji: "🍟",
      },
      {
        name: "Chicken Wrap",
        description: "Grilled chicken wrapped with fresh vegetables and creamy sauce.",
        price: 159,
        emoji: "🌯",
      },
      {
        name: "Loaded Cheese Fries",
        description: "Crispy fries topped with melted cheese and special sauce.",
        price: 149,
        emoji: "🍟",
      },
    ],
  },

  {
    name: "Dragon Wok",
    cuisine: "Chinese • Asian • Noodles",
    rating: "4.7",
    time: "25–35 min",
    price: "₹₹",
    image:
      "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=900&q=80",
    menu: [
      {
        name: "Veg Hakka Noodles",
        description: "Stir-fried noodles loaded with fresh vegetables and sauces.",
        price: 169,
        emoji: "🍜",
      },
      {
        name: "Chicken Fried Rice",
        description: "Flavorful fried rice with tender chicken and fresh vegetables.",
        price: 199,
        emoji: "🍚",
      },
      {
        name: "Chicken Manchurian",
        description: "Crispy chicken tossed in a spicy and tangy Manchurian sauce.",
        price: 229,
        emoji: "🍗",
      },
      {
        name: "Veg Spring Rolls",
        description: "Crispy rolls filled with seasoned vegetables.",
        price: 139,
        emoji: "🥢",
      },
      {
        name: "Schezwan Noodles",
        description: "Spicy noodles cooked with authentic Schezwan sauce.",
        price: 189,
        emoji: "🍜",
      },
      {
        name: "Chilli Paneer",
        description: "Crispy paneer tossed with peppers and spicy Chinese sauce.",
        price: 219,
        emoji: "🥡",
      },
    ],
  },

  {
    name: "Royal Biryani",
    cuisine: "Biryani • Mughlai • Indian",
    rating: "4.9",
    time: "30–35 min",
    price: "₹₹₹",
    image:
      "https://images.unsplash.com/photo-1563379091339-03246963d51a?auto=format&fit=crop&w=900&q=80",
    menu: [
      {
        name: "Hyderabadi Chicken Biryani",
        description: "Traditional Hyderabadi biryani with aromatic spices and chicken.",
        price: 279,
        emoji: "🍛",
      },
      {
        name: "Mutton Biryani",
        description: "Tender mutton cooked with fragrant basmati rice and spices.",
        price: 349,
        emoji: "🍖",
      },
      {
        name: "Paneer Biryani",
        description: "Aromatic vegetarian biryani with soft paneer pieces.",
        price: 229,
        emoji: "🍚",
      },
      {
        name: "Chicken 65",
        description: "Crispy spicy chicken pieces with South Indian flavors.",
        price: 219,
        emoji: "🍗",
      },
      {
        name: "Mirchi Ka Salan",
        description: "Classic Hyderabadi curry served with spicy green chillies.",
        price: 129,
        emoji: "🌶️",
      },
      {
        name: "Double Ka Meetha",
        description: "Traditional Hyderabadi bread dessert with milk and nuts.",
        price: 119,
        emoji: "🍮",
      },
    ],
  },

  {
    name: "Sweet Treats",
    cuisine: "Desserts • Cakes • Ice Cream",
    rating: "4.8",
    time: "15–20 min",
    price: "₹₹",
    image:
      "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=900&q=80",
    menu: [
      {
        name: "Chocolate Cake",
        description: "Rich and moist chocolate cake topped with creamy frosting.",
        price: 149,
        emoji: "🍰",
      },
      {
        name: "Chocolate Brownie",
        description: "Warm chocolate brownie with a soft and fudgy center.",
        price: 129,
        emoji: "🍫",
      },
      {
        name: "Vanilla Ice Cream",
        description: "Smooth and creamy classic vanilla ice cream.",
        price: 99,
        emoji: "🍨",
      },
      {
        name: "Gulab Jamun",
        description: "Soft milk dumplings soaked in sweet aromatic syrup.",
        price: 89,
        emoji: "🍩",
      },
      {
        name: "Strawberry Cake",
        description: "Soft sponge cake layered with strawberry cream.",
        price: 169,
        emoji: "🍓",
      },
      {
        name: "Chocolate Shake",
        description: "Thick creamy chocolate shake served chilled.",
        price: 139,
        emoji: "🥤",
      },
    ],
  },
];

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("foodDeliveryUser");


    return savedUser ? JSON.parse(savedUser) : null;
});
const [showLogin, setShowLogin] = useState(false);
const handleLogin = (loggedInUser) => {
    if (loggedInUser.role === "admin") {
        window.location.href = "/admin";
        return;
    }

    if (loggedInUser.role === "delivery") {
        window.location.href = "/delivery";
        return;
    }

    setUser(loggedInUser);
};
const handleLogout = () => {
    localStorage.removeItem("foodDeliveryToken");
    localStorage.removeItem("foodDeliveryUser");

    setUser(null);
};
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showOrders, setShowOrders] = useState(false);

const [customer, setCustomer] = useState({
  name: user?.name || "",
  phone: user?.phone || "",
  address: user?.address || "",
  city: "",
  pincode: "",
});

  const [orderPlaced, setOrderPlaced] = useState(false);

  const openRestaurant = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setShowCart(false);
    setShowCheckout(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const goBackToRestaurants = () => {
    setSelectedRestaurant(null);
    setShowCheckout(false);

    setTimeout(() => {
      document
        .getElementById("restaurants")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const addToCart = (item, restaurant) => {
    setCart((previousCart) => {
      const existingItem = previousCart.find(
        (cartItem) =>
          cartItem.name === item.name &&
          cartItem.restaurant === restaurant.name
      );

      if (existingItem) {
        return previousCart.map((cartItem) =>
          cartItem.name === item.name &&
          cartItem.restaurant === restaurant.name
            ? {
                ...cartItem,
                quantity: cartItem.quantity + 1,
              }
            : cartItem
        );
      }

      return [
        ...previousCart,
        {
          ...item,
          restaurant: restaurant.name,
          quantity: 1,
        },
      ];
    });
  };

  const increaseQuantity = (itemName, restaurantName) => {
    setCart((previousCart) =>
      previousCart.map((item) =>
        item.name === itemName && item.restaurant === restaurantName
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  const decreaseQuantity = (itemName, restaurantName) => {
    setCart((previousCart) =>
      previousCart
        .map((item) =>
          item.name === itemName && item.restaurant === restaurantName
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (itemName, restaurantName) => {
    setCart((previousCart) =>
      previousCart.filter(
        (item) =>
          !(
            item.name === itemName &&
            item.restaurant === restaurantName
          )
      )
    );
  };

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const deliveryFee = cart.length > 0 ? 40 : 0;
  const finalTotal = cartTotal + deliveryFee;

  const handleCustomerChange = (event) => {
    const { name, value } = event.target;

    setCustomer((previousCustomer) => ({
      ...previousCustomer,
      [name]: value,
    }));
  };

  const proceedToCheckout = () => {
    if (cart.length === 0) {
      return;
    }

    setShowCart(false);
    setShowCheckout(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

const placeOrder = async (event) => {
    event.preventDefault();

    if (
        !customer.name ||
        !customer.phone ||
        !customer.address ||
        !customer.city ||
        !customer.pincode
    ) {
        alert("Please fill all delivery details.");
        return;
    }

    try {
        const token = localStorage.getItem("foodDeliveryToken");

        if (!token) {
            alert("Please login again.");
            return;
        }

        const orderData = {
            items: cart,
            deliveryDetails: customer,
            subtotal: cartTotal,
            deliveryFee: deliveryFee,
            totalAmount: finalTotal
        };

        const response = await fetch(
            "https://food-delivery-application-b2pl.onrender.com/api/orders",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(orderData)
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.message || "Failed to place order"
            );
        }

        console.log("Order Created:", data.order);

        setOrderPlaced(true);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    } catch (error) {
        console.error("Place Order Error:", error);

        alert(
            error.message ||
            "Something went wrong while placing your order."
        );
    }
};

  const continueShopping = () => {
    setOrderPlaced(false);
    setShowCheckout(false);
    setCart([]);

    setTimeout(() => {
      document
        .getElementById("restaurants")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };
if (!user) {
    if (showLogin) {
        return (
            <AuthPage
                onLogin={handleLogin}
            />
        );
    }

    return (
        <Home
            onUserLogin={() => {
                setShowLogin(true);
            }}
            onDeliveryLogin={() => {
                window.location.href = "/delivery";
            }}
            onAdminLogin={() => {
                window.location.href = "/admin";
            }}
        />
    );
}

return (
    <div className="app">
      
      {/* NAVBAR */}
      {showOrders && (
    <MyOrders
        onBack={() => {
            setShowOrders(false);
        }}
    />
)}
      <nav className="navbar">
        <div
          className="logo"
          onClick={() => {
            setSelectedRestaurant(null);
            setShowCart(false);
            setShowCheckout(false);
            setOrderPlaced(false);
          }}
          style={{ cursor: "pointer" }}
        >
          <span className="logo-icon">🍽️</span>

          <span>
            Food<span className="logo-highlight">ly</span>
          </span>
        </div>

        <div className="nav-links">
          <a
            href="#home"
            onClick={() => {
              setSelectedRestaurant(null);
              setShowCart(false);
              setShowCheckout(false);
              setOrderPlaced(false);
            }}
          >
            Home
          </a>

          <a
            href="#restaurants"
            onClick={() => {
              setSelectedRestaurant(null);
              setShowCart(false);
              setShowCheckout(false);
              setOrderPlaced(false);
            }}
          >
            Restaurants
          </a>

          <a href="#about">About</a>
        </div>

        <div className="nav-actions">
          <div className="user-menu">
  <span className="user-name">
    👤 {user?.name}
  </span>

  <button
    className="login-btn"
    onClick={handleLogout}
  >
    Logout
  </button>
</div>
<button
    className="orders-btn"
    onClick={() => {
        setShowOrders(true);
        setShowCart(false);
        setShowCheckout(false);
        setSelectedRestaurant(null);
    }}
>
    📦 My Orders
</button>

          <button
            className="cart-btn"
            onClick={() => {
              setShowCart(true);
              setShowCheckout(false);
            }}
          >
            🛒 <span>Cart</span>
            <b>{cartCount}</b>
          </button>
        </div>
      </nav>

      {/* CART */}
      {showCart && (
        <div
          className="cart-overlay"
          onClick={() => setShowCart(false)}
        >
          <aside
            className="cart-panel"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="cart-header">
              <div>
                <span className="section-label">YOUR ORDER</span>
                <h2>Your Cart</h2>
              </div>

              <button
                className="cart-close"
                onClick={() => setShowCart(false)}
              >
                ×
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="empty-cart">
                <div className="empty-cart-icon">🛒</div>

                <h3>Your cart is empty</h3>

                <p>
                  Looks like you haven't added anything to your
                  cart yet.
                </p>

                <button
                  className="empty-cart-button"
                  onClick={() => setShowCart(false)}
                >
                  Explore Food
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <div
                      className="cart-item"
                      key={`${item.restaurant}-${item.name}`}
                    >
                      <div className="cart-item-icon">
                        {item.emoji}
                      </div>

                      <div className="cart-item-info">
                        <h3>{item.name}</h3>

                        <small>{item.restaurant}</small>

                        <strong>
                          ₹{item.price * item.quantity}
                        </strong>

                        <div className="quantity-controls">
                          <button
                            onClick={() =>
                              decreaseQuantity(
                                item.name,
                                item.restaurant
                              )
                            }
                          >
                            −
                          </button>

                          <span>{item.quantity}</span>

                          <button
                            onClick={() =>
                              increaseQuantity(
                                item.name,
                                item.restaurant
                              )
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <button
                        className="remove-item"
                        onClick={() =>
                          removeItem(
                            item.name,
                            item.restaurant
                          )
                        }
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>

                <div className="cart-summary">
                  <div>
                    <span>Subtotal</span>
                    <strong>₹{cartTotal}</strong>
                  </div>

                  <div>
                    <span>Delivery Fee</span>
                    <strong>₹40</strong>
                  </div>

                  <div className="cart-total">
                    <span>Total</span>
                    <strong>₹{finalTotal}</strong>
                  </div>

                  <button
                    className="checkout-button"
                    onClick={proceedToCheckout}
                  >
                    Proceed to Checkout →
                  </button>
                </div>
              </>
            )}
          </aside>
        </div>
      )}

      {/* CHECKOUT */}
      {showCheckout ? (
        <section className="checkout-page">
          <div className="checkout-container">
            {!orderPlaced ? (
              <>
                <div className="checkout-heading">
                  <button
                    className="back-button"
                    onClick={() => {
                      setShowCheckout(false);
                      setShowCart(true);
                    }}
                  >
                    ← Back to Cart
                  </button>

                  <span className="section-label">
                    CHECKOUT
                  </span>

                  <h1>Complete your order</h1>

                  <p>
                    Enter your delivery details and place your
                    order.
                  </p>
                </div>

                <div className="checkout-layout">
                  {/* DELIVERY FORM */}
                  <div className="checkout-form-card">
                    <div className="checkout-card-heading">
                      <div className="checkout-icon">📍</div>

                      <div>
                        <h2>Delivery details</h2>
                        <p>Where should we deliver your food?</p>
                      </div>
                    </div>

                    <form onSubmit={placeOrder}>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Full Name</label>

                          <input
                            type="text"
                            name="name"
                            value={customer.name}
                            onChange={handleCustomerChange}
                            placeholder="Enter your full name"
                          />
                        </div>

                        <div className="form-group">
                          <label>Phone Number</label>

                          <input
                            type="tel"
                            name="phone"
                            value={customer.phone}
                            onChange={handleCustomerChange}
                            placeholder="Enter phone number"
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label>Delivery Address</label>

                        <textarea
                          name="address"
                          value={customer.address}
                          onChange={handleCustomerChange}
                          placeholder="House no, street, area..."
                          rows="4"
                        ></textarea>
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label>City</label>

                          <input
                            type="text"
                            name="city"
                            value={customer.city}
                            onChange={handleCustomerChange}
                            placeholder="Enter city"
                          />
                        </div>

                        <div className="form-group">
                          <label>Pincode</label>

                          <input
                            type="text"
                            name="pincode"
                            value={customer.pincode}
                            onChange={handleCustomerChange}
                            placeholder="Enter pincode"
                          />
                        </div>
                      </div>

                      <div className="secure-checkout-note">
                        🔒 Your delivery information is securely
                        handled.
                      </div>

                      <button
                        type="submit"
                        className="place-order-button"
                      >
                        Place Order • ₹{finalTotal}
                      </button>
                    </form>
                  </div>

                  {/* ORDER SUMMARY */}
                  <div className="order-summary-card">
                    <div className="checkout-card-heading">
                      <div className="checkout-icon">🧾</div>

                      <div>
                        <h2>Order summary</h2>
                        <p>{cartCount} item(s) in your order</p>
                      </div>
                    </div>

                    <div className="checkout-items">
                      {cart.map((item) => (
                        <div
                          className="checkout-item"
                          key={`${item.restaurant}-${item.name}`}
                        >
                          <div className="checkout-item-icon">
                            {item.emoji}
                          </div>

                          <div>
                            <h3>{item.name}</h3>
                            <span>
                              {item.quantity} × ₹{item.price}
                            </span>
                          </div>

                          <strong>
                            ₹{item.price * item.quantity}
                          </strong>
                        </div>
                      ))}
                    </div>

                    <div className="checkout-price-breakdown">
                      <div>
                        <span>Subtotal</span>
                        <strong>₹{cartTotal}</strong>
                      </div>

                      <div>
                        <span>Delivery Fee</span>
                        <strong>₹{deliveryFee}</strong>
                      </div>

                      <div className="checkout-grand-total">
                        <span>Total</span>
                        <strong>₹{finalTotal}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              /* ORDER SUCCESS */
              <div className="order-success">
                <div className="success-animation">✓</div>

                <span className="section-label">
                  ORDER CONFIRMED
                </span>

                <h1>Your order has been placed!</h1>

                <p>
                  Thank you, {customer.name}. Your delicious food
                  is being prepared and will be delivered to:
                </p>

                <div className="success-address">
                  📍 {customer.address}, {customer.city} -{" "}
                  {customer.pincode}
                </div>

                <div className="order-status-preview">
                  <div className="status-step active">
                    <span>✓</span>
                    <div>
                      <strong>Order Confirmed</strong>
                      <small>Your order has been received</small>
                    </div>
                  </div>

                  <div className="status-line"></div>

                  <div className="status-step">
                    <span>👨‍🍳</span>
                    <div>
                      <strong>Preparing</strong>
                      <small>Restaurant will prepare your food</small>
                    </div>
                  </div>

                  <div className="status-line"></div>

                  <div className="status-step">
                    <span>🚴</span>
                    <div>
                      <strong>On the way</strong>
                      <small>Delivery partner will pick it up</small>
                    </div>
                  </div>
                </div>

                <button
                  className="continue-shopping-button"
                  onClick={continueShopping}
                >
                  Continue Shopping →
                </button>
              </div>
            )}
          </div>
        </section>
      ) : selectedRestaurant ? (
        /* RESTAURANT MENU */
        <section className="menu-page">
          <div className="menu-container">
            <button
              className="back-button"
              onClick={goBackToRestaurants}
            >
              ← Back to Restaurants
            </button>

            <div className="menu-header">
              <div className="menu-header-image">
                <img
                  src={selectedRestaurant.image}
                  alt={selectedRestaurant.name}
                />
              </div>

              <div className="menu-header-content">
                <span className="section-label">
                  RESTAURANT MENU
                </span>

                <h1>{selectedRestaurant.name}</h1>

                <p className="menu-cuisine">
                  {selectedRestaurant.cuisine}
                </p>

                <div className="menu-meta">
                  <span>★ {selectedRestaurant.rating}</span>
                  <span>🕐 {selectedRestaurant.time}</span>
                  <span>{selectedRestaurant.price}</span>
                </div>

                <p className="menu-description">
                  Freshly prepared food, delicious flavors and fast
                  delivery right to your doorstep.
                </p>
              </div>
            </div>

            <div className="menu-title">
              <div>
                <span className="section-label">OUR MENU</span>
                <h2>Choose your favorite</h2>
              </div>

              <span className="menu-item-count">
                {selectedRestaurant.menu.length} items
              </span>
            </div>

            <div className="food-menu-grid">
              {selectedRestaurant.menu.map((item) => (
                <article
                  className="food-item-card"
                  key={item.name}
                >
                  <div className="food-item-image">
                    <span>{item.emoji}</span>
                  </div>

                  <div className="food-item-content">
                    <div className="food-item-top">
                      <h3>{item.name}</h3>

                      <strong>₹{item.price}</strong>
                    </div>

                    <p>{item.description}</p>

                    <button
                      className="add-food-button"
                      onClick={() =>
                        addToCart(item, selectedRestaurant)
                      }
                    >
                      + Add to Cart
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <>
          {/* HERO */}
          <section className="hero" id="home">
            <div className="hero-content">
              <div className="hero-badge">
                ✨ Delicious food, delivered fast
              </div>

              <h1>
                Your favorite food,
                <span> delivered to your door.</span>
              </h1>

              <p>
                Discover the best restaurants around you and order
                delicious meals whenever you want.
              </p>

              <div className="search-box">
                <span>📍</span>

                <input
                  type="text"
                  placeholder="Search for restaurants or food..."
                />

                <button>Search</button>
              </div>

              <div className="hero-stats">
                <div>
                  <strong>500+</strong>
                  <small>Restaurants</small>
                </div>

                <div>
                  <strong>10K+</strong>
                  <small>Happy Customers</small>
                </div>

                <div>
                  <strong>30 min</strong>
                  <small>Average Delivery</small>
                </div>
              </div>
            </div>

            <div className="hero-image-wrapper">
              <div className="hero-glow"></div>

              <img
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=85"
                alt="Delicious food"
                className="hero-image"
              />

              <div className="floating-card rating-card">
                <span>⭐</span>

                <div>
                  <strong>4.9 Rating</strong>
                  <small>From 2,000+ reviews</small>
                </div>
              </div>

              <div className="floating-card delivery-card">
                <span>🚴</span>

                <div>
                  <strong>Fast Delivery</strong>
                  <small>At your doorstep</small>
                </div>
              </div>
            </div>
          </section>

          {/* CATEGORIES */}
          <section className="section categories-section">
            <div className="section-heading">
              <div>
                <span className="section-label">EXPLORE</span>
                <h2>What are you craving?</h2>
              </div>
            </div>

            <div className="categories">
              {categories.map((category) => (
                <button
                  className="category-card"
                  key={category.name}
                >
                  <span className="category-icon">
                    {category.emoji}
                  </span>

                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </section>

          {/* RESTAURANTS */}
          <section
            className="section restaurants-section"
            id="restaurants"
          >
            <div className="section-heading">
              <div>
                <span className="section-label">TOP PICKS</span>
                <h2>Popular restaurants</h2>
              </div>

              <button className="view-all">
                View all →
              </button>
            </div>

            <div className="restaurant-grid">
              {restaurants.map((restaurant) => (
                <article
                  className="restaurant-card"
                  key={restaurant.name}
                  onClick={() => openRestaurant(restaurant)}
                >
                  <div className="restaurant-image-wrapper">
                    <img
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="restaurant-image"
                    />

                    <span className="favorite">♡</span>

                    <span className="delivery-time">
                      🕐 {restaurant.time}
                    </span>
                  </div>

                  <div className="restaurant-info">
                    <div className="restaurant-title-row">
                      <h3>{restaurant.name}</h3>

                      <span className="rating">
                        ★ {restaurant.rating}
                      </span>
                    </div>

                    <p>{restaurant.cuisine}</p>

                    <div className="restaurant-footer">
                      <span>{restaurant.price}</span>

                      <button
                        onClick={(event) => {
                          event.stopPropagation();
                          openRestaurant(restaurant);
                        }}
                      >
                        View Menu →
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="cta-section" id="about">
            <div>
              <span className="section-label">HUNGRY?</span>

              <h2>
                Good food is just a few clicks away.
              </h2>

              <p>
                Order your favorite meals and enjoy fast delivery
                right at your doorstep.
              </p>

              <button className="cta-button">
                Explore Restaurants →
              </button>
            </div>

            <div className="cta-emoji">🍔</div>
          </section>

          {/* FOOTER */}
          <footer>
            <div className="footer-logo">
              🍽️ Food<span>ly</span>
            </div>

            <p>
              Delicious food. Fast delivery. Happy moments.
            </p>

            <div className="footer-copy">
              © 2026 Foodly. All rights reserved.
            </div>
          </footer>
        </>
      )}
    </div>
  );
}

export default App;