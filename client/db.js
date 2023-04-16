"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = exports.onValue = exports.ref = exports.getDatabase = void 0;
const app_1 = require("../node_modules/firebase/app");
const database_1 = require("../node_modules/firebase/database");
Object.defineProperty(exports, "getDatabase", { enumerable: true, get: function () { return database_1.getDatabase; } });
Object.defineProperty(exports, "ref", { enumerable: true, get: function () { return database_1.ref; } });
Object.defineProperty(exports, "onValue", { enumerable: true, get: function () { return database_1.onValue; } });
const firebaseConfig = {
    apiKey: "AIzaSyDT7j7mOAxH-6EiuEw-ROWZcSd2tk_UTm8",
    authDomain: "piedra-papel-tijera-desafio6.firebaseapp.com",
    databaseURL: "https://piedra-papel-tijera-desafio6-default-rtdb.firebaseio.com",
    projectId: "piedra-papel-tijera-desafio6",
    storageBucket: "piedra-papel-tijera-desafio6.appspot.com",
    messagingSenderId: "780172267531",
    appId: "1:780172267531:web:065f3b812ddbc1ba9c370e",
};
const app = (0, app_1.initializeApp)(firebaseConfig);
exports.app = app;
