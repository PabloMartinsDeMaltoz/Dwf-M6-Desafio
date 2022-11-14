"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const db_1 = require("./db");
const path = require("path");
const nanoid_1 = require("nanoid");
const rutaRelativa = path.resolve(__dirname, "../dist", "index.html");
dotenv.config();
const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("dist"));
const userCollection = db_1.db.collection("users");
const roomCollection = db_1.db.collection("rooms");
app.get("/prueba", async (req, res) => {
    const querySnapshot = await userCollection.get();
    console.log(querySnapshot.docs[0].data());
});
app.get("/env", (req, res) => {
    console.log(process.env.GOOGLE_APPLICATION_CREDENTIALS);
    res.send(process.env.NODE_ENV);
});
//Este endpoin da de alta al user en la base de datos y le devuelve un id, si ya existe no permite crearlo
app.post("/signup", async (req, res) => {
    const { name } = req.body;
    const consulta = await userCollection.where("name", "==", name).get();
    if (consulta.empty) {
        const newUser = await userCollection.add({ name: name });
        newUser.update({ id: newUser.id, name: name });
        res.status(201).json({ message: "new user created" });
    }
    else {
        res.status(400).json({ message: "user already exists" });
    }
});
//Este endpoint crea un room en la RTDB y devuelve el id corto
app.post("/rooms", async (req, res) => {
    const { userId } = req.body;
    const { name } = req.body;
    const consulta = await userCollection.doc(userId.toString()).get();
    if (consulta.exists) {
        const shortId = (1000 + Math.floor(Math.random() * 999));
        const roomRef = await db_1.rtdb.ref("rooms/" + (0, nanoid_1.nanoid)());
        await roomRef.set({
            currentGame: {
                ["Player" + userId]: {
                    online: "true",
                    name: name,
                    start: true,
                    choice: "",
                },
            },
        });
        await (await roomCollection.doc(shortId.toString())).set({
            rtdbRoomId: roomRef.key,
        });
        res.status(201).json({ rtdbRoomId: roomRef.key });
    }
    else {
        res.status(400).json({ message: "user not found" });
    }
});
//Este endpoint me permite conectarme a un room existente
//http:/localhost:3000/rooms/1732?userId=v1f5asd814312e
app.get("/rooms/:roomId", async (req, res) => {
    const { roomId } = req.params;
    const { userId } = req.query;
    const consultaUser = await userCollection.doc(userId.toString()).get();
    if (consultaUser.exists) {
        const consultaRoom = await roomCollection.doc(roomId.toString()).get();
        const data = await consultaRoom.data();
        res.status(200).json(data);
    }
    else {
        res.status(400).json({ message: "room not found" });
    }
});
app.use("*", (req, res) => {
    res.sendFile(rutaRelativa);
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
