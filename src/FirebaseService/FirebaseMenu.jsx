import {  doc, getDoc, updateDoc   } from "firebase/firestore";
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

  export const addQRScanCount = async (restId, prevCount) => {
    const docRef = doc(db, "restaurants", restId );
    await updateDoc(docRef, {
        total_qr_scanned: (prevCount+1)
    });
  }