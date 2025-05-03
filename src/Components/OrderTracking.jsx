import React from "react";
import "./OrderTracking.css";
import { useNavigate } from "react-router-dom";

const orders = [
  {
    id: "ORD12345678",
    items: [
      {
        name: "Wireless Headphones",
        quantity: 1,
        price: 99.0,
      },
      {
        name: "Portable Speaker",
        quantity: 2,
        price: 50.0,
      },
    ],
  },
];

const OrderTracking = () => {
  const navigate = useNavigate(); // ✅ moved inside component

  const order = orders[0];
  const total = order.items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  const handleShowMenu = () => {
    navigate("/");
  };

  return (
    <div className="user-container">
      <h1 className="user-title">Order Tracking</h1>
      <p className="user-info">
        <strong>Order ID:</strong> {order.id}
      </p>

      <div className="order-box">
        <h3>Items in Your Order</h3>
        <ul className="order-list">
          {order.items.map((item, index) => (
            <li key={index} className="order-item">
              <div className="item-name-price">
                <strong>{item.name}</strong> - ${item.price.toFixed(2)}
              </div>
              <div className="qty-control">
                <span className="qty-count">Qty: {item.quantity}</span>
              </div>
            </li>
          ))}
        </ul>

        <p className="grand-total">
          <strong>Total:</strong> ${total.toFixed(2)}
        </p>

        <button className="track-order-btn" onClick={handleShowMenu}>
          Show Menu
        </button>
      </div>
    </div>
  );
};

export default OrderTracking;
