import { initializeApp, applicationDefault } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

initializeApp({
  credential: applicationDefault(),
  databaseURL: "https://piedra-papel-tijera-a8180.firebaseio.com",
});

export const db = getFirestore();
