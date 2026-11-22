import React from "react";
import "./OrderTable.css";

function OrderTable({ orders, onClose }) {
  return (
    <div className="orders-section">
      <div className="orders-card">
        <span className="section-tag">ORDER HISTORY</span>

        <h2>Customer Orders</h2>

        {orders.length === 0 ? (
          <p className="no-orders">No orders found.</p>
        ) : (
          <div className="table-container">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Customer Name</th>
                  <th>Food Name</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.customer_name}</td>
                    <td>{order.food_name}</td>
                    <td>{order.quantity}</td>
                    <td>₹{order.total_price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <button
          className="close-orders-btn"
          onClick={onClose}
        >
          Back to Menu
        </button>
      </div>
    </div>
  );
}

export default OrderTable;