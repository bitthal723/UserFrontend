import { doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { db } from "../firebase";


export const addItemToOrder = async (restId, itemList) => {
  const orderRef = doc(db, "orders", restId);
  try {
    await updateDoc(orderRef, {
      items: arrayUnion(...itemList)
    });
    console.log("Item added to order");
  } catch (error) {
    console.error("Error adding item:", error);
  }
};

export const getOrders = async (restId) => {
    const orderRef = doc(db, "orders", restId);
    const orderSnap = await getDoc(orderRef);
  
    if (orderSnap.exists()) {
      console.log("Order Data:", orderSnap.data());
      return orderSnap.data();
    } else {
      console.log("No such order!");
      return null;
    }
  };