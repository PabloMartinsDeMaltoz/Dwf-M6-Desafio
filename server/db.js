"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rtdb = exports.db = void 0;
var admin = require("firebase-admin");
var key = require("../key.json");
var app_1 = require("firebase-admin/app");
var firestore_1 = require("firebase-admin/firestore");
var database_1 = require("firebase-admin/database");
var clave = key;
(0, app_1.initializeApp)({
    credential: admin.credential.cert(clave),
    databaseURL: "https://piedra-papel-tijera-desafio6-default-rtdb.firebaseio.com",
});
exports.db = (0, firestore_1.getFirestore)();
exports.rtdb = (0, database_1.getDatabase)();
