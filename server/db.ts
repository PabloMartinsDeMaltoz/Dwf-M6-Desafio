import * as admin from "firebase-admin";
import * as key from "../key.json";
import { initializeApp, applicationDefault } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getDatabase } from "firebase-admin/database";
const clave = key as any;

initializeApp({
  credential: admin.credential.cert(clave),
  databaseURL:
    "https://piedra-papel-tijera-desafio6-default-rtdb.firebaseio.com",
});

export const db = getFirestore();
export const rtdb = getDatabase();
