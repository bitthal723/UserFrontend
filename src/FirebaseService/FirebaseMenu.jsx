import {  doc, getDoc   } from "firebase/firestore";
import { db } from "../firebase";

export const getMenu = async (restId) => {
    const docRef = doc(db, "restaurants", restId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
  }

  };