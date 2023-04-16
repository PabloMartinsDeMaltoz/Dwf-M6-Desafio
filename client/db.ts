import { initializeApp } from "../node_modules/firebase/app";
import { getDatabase, ref, onValue } from "../node_modules/firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDT7j7mOAxH-6EiuEw-ROWZcSd2tk_UTm8",
  authDomain: "piedra-papel-tijera-desafio6.firebaseapp.com",
  databaseURL:
    "https://piedra-papel-tijera-desafio6-default-rtdb.firebaseio.com",
  projectId: "piedra-papel-tijera-desafio6",
  storageBucket: "piedra-papel-tijera-desafio6.appspot.com",
  messagingSenderId: "780172267531",
  appId: "1:780172267531:web:065f3b812ddbc1ba9c370e",
};

const app = initializeApp(firebaseConfig);

export { getDatabase, ref, onValue, app };
