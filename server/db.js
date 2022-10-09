"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const app_1 = require("firebase-admin/app");
const firestore_1 = require("firebase-admin/firestore");
app_1.initializeApp({
    credential: app_1.applicationDefault(),
    databaseURL: "https://piedra-papel-tijera-a8180.firebaseio.com",
});
exports.db = firestore_1.getFirestore();
