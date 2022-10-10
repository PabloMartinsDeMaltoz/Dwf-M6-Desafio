"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 3000;
const app = express();
app.use(express.static("dist"));
app.get("/", (req, res) => {
    res.send("HOLA MUNDO!");
});
app.get("/env", (req, res) => {
    console.log(process.env.PORT);
    res.send(process.env.NODE_ENV);
});
app.use("*", (req, res) => {
    res.sendFile(__dirname + "./dist/index.html");
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
