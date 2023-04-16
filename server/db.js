"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rtdb = exports.db = void 0;
const admin = require("firebase-admin");
const key = require("../key.json");
const app_1 = require("firebase-admin/app");
const firestore_1 = require("firebase-admin/firestore");
const database_1 = require("firebase-admin/database");
const clave = key;
(0, app_1.initializeApp)({
    credential: admin.credential.cert(clave),
    databaseURL: "https://piedra-papel-tijera-desafio6-default-rtdb.firebaseio.com",
});
exports.db = (0, firestore_1.getFirestore)();
exports.rtdb = (0, database_1.getDatabase)();
