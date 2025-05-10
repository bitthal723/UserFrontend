import React, { useEffect, useState } from "react";
import "./OrderTracking.css";
import { useLocation, useNavigate } from "react-router-dom";
// import { getOrderedItem } from "../service/OrderService";
import { getOrders } from "../FirebaseService/OrderService";


const OrderTracking = () => {
  const [orderedItems, setOrderedItems] = useState([]);

  const navigate = useNavigate(); // ✅ moved inside component
  const {state} = useLocation();
  const restId = state?.restId;
  const tableNumber = state?.tableNumber;
  let [total, setTotal] = useState(0);
  
  const fetchOrder = async () => {
      try {
        const orderResponse = await getOrders(restId);
        console.log(orderResponse);
        const mergedItems = mergeOrderItems(orderResponse.items);
        console.log(mergedItems);
        setOrderedItems(mergedItems);
        const tempTotal = mergedItems.reduce((sum, item) => {
          return sum + item.itemPrice * item.quantity;
        }, 0);
        setTotal(tempTotal);
      } catch (error) {
        console.error('Error fetching number:', error);
      }
    };
    useEffect(() => {
      fetchOrder();
    }, []);

    const mergeOrderItems = (items) => {
      const merged = {};
      console.log(items);
      
      items.forEach(item => {
        const key = `${item.tableNumber}-${item.itemId}`;
        if (!merged[key]) {
          merged[key] = { ...item };
        } else {
          merged[key].quantity += item.quantity;
        }
        console.log(merged);
      });
      
      
      
    
      return findOrdersFromTable(Object.values(merged));
    };
   const findOrdersFromTable = (mergedItems)=>{
        const finalOrder = [];
        mergedItems.map(item => {
          const key = item.itemId
          if(item.tableNumber == tableNumber){
            finalOrder.push(item);
          }
        });
        return finalOrder;
    }

  const handleShowMenu = () => {
    navigate(`//?restId=${restId}&tableNumber=${tableNumber}&qrFlag=false`);
  };

  return (
    <div className="user-container">
      <h1 className="user-title">Order Tracking</h1>
      <p className="user-info">
        {/* <strong>Order ID:</strong> {order.id} */}
      </p>

      <div className="order-box">
        <h3>Items in Your Order</h3>
        <ul className="order-list">
          {orderedItems.map((item, index) => (
            <li key={index} className="order-item">
              <div className="item-name-price">
                <strong>{item.itemName}</strong> - ₹{item.itemPrice} x {item.quantity}
              </div>
              <div className="qty-control">
                <span className="qty-count">₹{item.quantity*item.itemPrice}</span>
              </div>
            </li>
          ))}
        </ul>

        <p className="grand-total">
          <strong>Total:</strong> ₹{total}
        </p>

        <button className="track-order-btn" onClick={handleShowMenu}>
          Show Menu
        </button>
      </div>
    </div>
  );
};

export default OrderTracking;
