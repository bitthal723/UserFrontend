import { useEffect, useState } from "react";
import "./User.css";
import { useNavigate } from "react-router-dom";
import { getMenu } from "../service/MenuService";
import { placeOrder } from "../service/OrderService";
function User() {
  const userName = "Jaa Baa";
  const tableNumber = 12;
  const restaurantName = "Atank Ka Dusra Naam Babu Bhai";
  const restId = '88CR5HRTOK';
  const [menu, setMenu] = useState([]);
  const [initialOrder, setInitialOrder] = useState([]);
  
  const fetchMenu = async () => {
    try {
      const response = await getMenu(restId);
      const menuWithQty = response.data.map((item) => ({
        ...item,
        quantity: 0,
        tableNumber: tableNumber, // ✅ Add table number to each item
      }));
      setMenu(menuWithQty);
      setInitialOrder(menuWithQty);
      setOrder(menuWithQty);
      
    } catch (error) {
      console.error('Error fetching number:', error);
    }
  };
  useEffect(() => {
    fetchMenu();
  }, []);

  
  const [order, setOrder] = useState(initialOrder);

  const navigate = useNavigate();

  const incrementQty = (index) => {
    console.log(order);
    const updatedOrder = [...order];
    updatedOrder[index].quantity += 1;
    setOrder(updatedOrder);
  };

  const decrementQty = (index) => {
    const updatedOrder = [...order];
    if (updatedOrder[index].quantity > 0) {
      updatedOrder[index].quantity -= 1;
    }
    setOrder(updatedOrder);
  };

  const getTotal = () => {
    return order.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const onPlaceClick = async () => {
    setOrder(initialOrder);
    const orderItemsToSend = order
    .filter(item => item.quantity > 0)
    .map(({ itemId, itemName, quantity, tableNumber }) => ({
      itemId,
      itemName,
      quantity,
      tableNumber,
    }));
    console.log(orderItemsToSend);
    const response = await placeOrder(restId, orderItemsToSend);
    console.log(response);
    navigate("/track");

  };

  const handleTrackOrderClick = () => {
    navigate("/track");
  };

  return (
    <div className="user-container">
      <h1 className="user-title">Welcome, {userName}!</h1>
      <p className="user-info">
        <strong>Table No:</strong> {tableNumber}
      </p>

      <div className="order-box">
        <h3>Your Order</h3>
        <ul className="order-list">
          {menu.map((item, index) => (
            <li key={index} className="order-item">
              <div className="item-name-price">
                <strong>{item.itemName}</strong> - ₹{item.itemPrice}
              </div>
              <div className="qty-control">
                <button className="qty-btn-1" onClick={() => decrementQty(index)}>−</button>
                <span className="qty-count">{order[index]?.quantity ?? 0}</span>
                <button className="qty-btn-2" onClick={() => incrementQty(index)}>+</button>
              </div>
            </li>
          ))}
        </ul>

        {order.some(item => item.quantity > 0) ? (
          <>
            <p className="grand-total">
              <strong>Grand Total:</strong> ₹{getTotal()}
            </p>
            <button className="place-order-btn" onClick={onPlaceClick}>
              Place Order
            </button>
            <button className="track-order-btn" onClick={handleTrackOrderClick}>
              Track Your Order
            </button>
          </>
        ) : (
          <p className="empty-order">No items selected.</p>
        )}
      </div>
    </div>
  );
}

export default User;
