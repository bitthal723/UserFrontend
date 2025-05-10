import { useEffect, useState } from "react";
import "./User.css";
import { useNavigate, useLocation } from "react-router-dom";
// import { getMenu } from "../service/MenuService";
// import { placeOrder } from "../service/OrderService";
import { addQRScanCount, getMenu } from "../FirebaseService/FirebaseMenu";
import { addItemToOrder } from "../FirebaseService/OrderService";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

function User() {
  
  const query = useQuery();
  const tableNumber = query.get('tableNumber');
  const [restName, setRestName] = useState('');
  const restId = query.get('restId');
  const [menu, setMenu] = useState([]);
  const [initialOrder, setInitialOrder] = useState([]);
  
  const fetchMenu = async () => {
    let visitFromQR = query.get('qrFlag');

    try {
      const response = await getMenu(restId);
      console.log(response['total_qr_scanned']);
      console.log(visitFromQR);
            

       // ✅ only runs on first visit from QR
        //  console.log("came from qr ",response['total_qr_scanned']);
        if(visitFromQR == 'true'){
          await addQRScanCount(restId, response['total_qr_scanned']);
          visitFromQR = 'false';
        }
        
      

    


      // const qrCountResponse = await addQRScanCount(restId, response['total_qr_scanned']);
      
      if(response['rest_name'] != null){
        
        setRestName(response['rest_name']);
      }
      const menuWithQty = response['menu'].map((item) => ({
        ...item,
        quantity: 0,
        tableNumber: tableNumber,// ✅ Add table number to each item
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
    // console.log(order);
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
      (total, item) => total + item.itemPrice * item.quantity,
      0
    );
  };

  const onPlaceClick = async () => {
    setOrder(initialOrder);
    const orderItemsToSend = order
    .filter(item => item.quantity > 0);

    const response = await addItemToOrder(restId,orderItemsToSend);
    console.log(response);
  
    navigate("/track", {state : {restId, tableNumber}});

  };

  const handleTrackOrderClick = () => {
    navigate("/track", {state : {restId, tableNumber}});
  };

  return (
    <div className="user-container">
      <h1 className="user-title">Welcome to</h1>
      <p className="user-title">{restName}</p>
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
              <strong>Total:</strong> ₹{getTotal()}
            </p>
            <button className="place-order-btn" onClick={onPlaceClick}>
              Place Order
            </button>
          </>
        ) : (
          <p className="empty-order">No items selected.</p>
        )}
        <button className="track-order-btn" onClick={handleTrackOrderClick}>
              Track Your Order
            </button>
      </div>
    </div>
  );
}

export default User;
