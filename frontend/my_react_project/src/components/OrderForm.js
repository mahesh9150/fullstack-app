import React, { useState } from "react";
import "./OrderForm.css";

function OrderForm({ food, onSubmit, onCancel }) {
  const [customerName, setCustomerName] = useState("");
  const [quantity, setQuantity] = useState(1);

  const totalPrice = food.price * Number(quantity);

  const handleSubmit = (e) => {
    e.preventDefault();

    const orderData = {
      customer_name: customerName,
      food_name: food.name,
      quantity: Number(quantity),
      total_price: totalPrice,
    };

    onSubmit(orderData);
  };

  return (
    <div className="form-section">
      <div className="order-form-card">
        <h2>Order Your Food</h2>

        <div className="selected-food">
          <span className="selected-emoji">{food.emoji}</span>

          <div>
            <h3>{food.name}</h3>
            <p>Price: ₹{food.price}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <label>Customer Name</label>

          <input
            type="text"
            placeholder="Enter your name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />

          <label>Food Quantity</label>

          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />

          <div className="total">
            Total Price: ₹{totalPrice}
          </div>

          <div className="form-buttons">
            <button type="submit" className="order-btn">
              Place Order
            </button>

            <button
              type="button"
              className="cancel-btn"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default OrderForm; 