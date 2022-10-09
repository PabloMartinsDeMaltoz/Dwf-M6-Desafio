"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const dotenv = require("dotenv");
const index_1 = require("../dist/index");
const cors = require("cors");
const db_1 = require("./db");
dotenv.config();
const port = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.static("dist"));
app.get("/prueba", async (req, res) => {
    const querySnapshot = await db_1.db.collection("users").get();
    console.log(querySnapshot.docs[0].data());
});
app.get("/env", (req, res) => {
    console.log(process.env.GOOGLE_APPLICATION_CREDENTIALS);
    res.send(process.env.NODE_ENV);
});
app.use("*", (req, res) => {
    res.sendFile(index_1.dist_dir + "/index.html");
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
