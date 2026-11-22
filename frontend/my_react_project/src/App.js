import React, { useState } from "react";
import "./App.css";
import OrderForm from "./components/OrderForm";
import OrderTable from "./components/OrderTable";

const API_URL = "http://127.0.0.1:8000";

const foods = [
  { id: 1, name: "Pizza", price: 250, emoji: "🍕" },
  { id: 2, name: "Burger", price: 150, emoji: "🍔" },
  { id: 3, name: "Pasta", price: 180, emoji: "🍝" },
  { id: 4, name: "French Fries", price: 100, emoji: "🍟" },
  { id: 5, name: "Sandwich", price: 120, emoji: "🥪" },
  { id: 6, name: "Fried Chicken", price: 220, emoji: "🍗" },
];

function App() {
  const [selectedFood, setSelectedFood] = useState(null);
  const [showOrders, setShowOrders] = useState(false);
  const [orders, setOrders] = useState([]);

  // Safe scroll function
  const scrollToSection = (id) => {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // Select food
  const handleOrderClick = (food) => {
    setSelectedFood(food);
    setShowOrders(false);

    setTimeout(() => {
      scrollToSection("order-section");
    }, 100);
  };

  // Submit order
  const handleSubmitOrder = async (orderData) => {
    try {
      const response = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Order failed");
      }

      alert("Order placed successfully!");

      setSelectedFood(null);
      setShowOrders(false);

      setTimeout(() => {
        scrollToSection("menu");
      }, 100);
    } catch (error) {
      alert("Backend connection failed. Please check your server.");
      console.error(error);
    }
  };

  // Fetch orders
  const handleViewOrders = async () => {
    try {
      const response = await fetch(`${API_URL}/orders`);

      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }

      const data = await response.json();

      setOrders(data);
      setSelectedFood(null);
      setShowOrders(true);

      setTimeout(() => {
        scrollToSection("orders-section");
      }, 100);
    } catch (error) {
      alert("Cannot load orders. Check backend connection.");
      console.error(error);
    }
  };

  // Back to menu
  const handleBackToMenu = () => {
    setShowOrders(false);

    setTimeout(() => {
      scrollToSection("menu");
    }, 100);
  };

  return (
    <div className="app">

      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">🍴 Foodie</div>

        <div className="nav-links">
          <button onClick={() => scrollToSection("home")}>
            Home
          </button>

          <button onClick={() => scrollToSection("about")}>
            About
          </button>

          <button onClick={() => scrollToSection("menu")}>
            Menu
          </button>

          <button onClick={handleViewOrders}>
            View Orders
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section id="home" className="hero">
        <div className="hero-content">
          <span className="hero-tag">
            FRESH FOOD • GREAT TASTE
          </span>

          <h1>
            Delicious Food
            <br />
            <span>Delivered Fresh</span>
          </h1>

          <p>
            Enjoy delicious meals prepared with fresh ingredients.
            Order your favourite food today!
          </p>

          <button
            className="hero-btn"
            onClick={() => scrollToSection("menu")}
          >
            Explore Menu →
          </button>
        </div>
      </section>

      {/* About */}
      <section id="about" className="about-section">
        <div className="about-content">
          <div className="about-image"></div>

          <div className="about-text">
            <span className="section-tag">
              ABOUT FOODIE
            </span>

            <h2>
              Good Food.
              <br />
              Good Mood.
            </h2>

            <p>
              At Foodie, we believe great food brings people
              together. We prepare tasty meals using fresh
              ingredients and serve them with care.
            </p>

            <button
              className="hero-btn"
              onClick={() => scrollToSection("menu")}
            >
              Order Your Food
            </button>
          </div>
        </div>
      </section>

      {/* Menu */}
      <section id="menu" className="menu-section">
        <div className="menu-heading">
          <span className="section-tag">
            OUR MENU
          </span>

          <h2>Popular Foods</h2>

          <p>
            Choose your favourite food and place your order.
          </p>
        </div>

        <div className="food-grid">
          {foods.map((food) => (
            <div className="food-card" key={food.id}>
              <div className={`food-image food-${food.id}`}>
                <span>{food.emoji}</span>
              </div>

              <div className="food-details">
                <h3>{food.name}</h3>

                <p className="food-price">
                  ₹{food.price}
                </p>

                <button
                  className="food-order-btn"
                  onClick={() => handleOrderClick(food)}
                >
                  Order Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Order Form */}
      <section id="order-section">
        {selectedFood && (
          <OrderForm
            food={selectedFood}
            onSubmit={handleSubmitOrder}
            onCancel={() => {
              setSelectedFood(null);
              scrollToSection("menu");
            }}
          />
        )}
      </section>

      {/* View Orders */}
      <section id="orders-section">
        {showOrders && (
          <OrderTable
            orders={orders}
            onClose={handleBackToMenu}
          />
        )}
      </section>

      {/* Footer */}
      <footer className="footer">
        <h3>🍴 Foodie</h3>

        <p>Fresh food. Happy customers.</p>

        <p>© 2026 Foodie. All rights reserved.</p>
      </footer>

    </div>
  );
}

export default App;