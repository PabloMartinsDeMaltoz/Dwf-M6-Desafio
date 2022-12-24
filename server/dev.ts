import * as express from "express";
import * as dotenv from "dotenv";
import * as cors from "cors";
import { db, rtdb } from "./db";
import { getDatabase, ref, onDisconnect } from "firebase/database";
import * as path from "path";
import { nanoid } from "nanoid";
import { json } from "node:stream/consumers";
import { match } from "assert";
import { LogError } from "concurrently";

const rutaRelativa = path.resolve(__dirname, "../dist", "index.html");
dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("dist"));

const userCollection = db.collection("users");
const roomCollection = db.collection("rooms");

app.get("/prueba", async (req, res) => {
  const querySnapshot = await userCollection.get();
  console.log(querySnapshot.docs[0].data());
});
app.get("/env", (req, res) => {
  console.log(process.env.GOOGLE_APPLICATION_CREDENTIALS);
  res.send(process.env.NODE_ENV);
});

//Este endpoint da de alta al user en la base de datos y le devuelve un id, si ya existe no permite crearlo
app.post("/signup", async (req, res) => {
  const { name } = req.body;
  const consulta = await userCollection.where("name", "==", name).get();

  if (consulta.empty) {
    const newUser = await userCollection.add({ name: name });
    newUser.update({ userId: newUser.id, name: name });
    res.status(201).json({ userId: newUser.id });
  } else {
    console.log("user already exist");
    res.status(201).json({ userId: consulta.docs[0].data().userId });
  }
});

//Este endpoint crea un room en la RTDB y devuelve el id corto
app.post("/rooms", async (req, res) => {
  const { userId } = req.body;
  const { name } = req.body;
  const consulta = await userCollection.doc(userId.toString()).get();

  if (consulta.exists) {
    const shortId = (1000 + Math.floor(Math.random() * 999)) as any;

    const roomRef = await rtdb.ref("rooms/" + nanoid());
    roomRef.set({
      currentGame: {
        ["Player" + userId]: {
          online: true,
          name: name,
          start: false,
          choice: "",
          hystory: { victorias: 0, perdidas: 0 },
        },
      },
    });
    await (
      await roomCollection.doc(shortId.toString())
    ).set({
      rtdbRoomId: roomRef.key,
    });
    res.status(201).json({ shortId });
  } else {
    res.status(400).json({ message: "user not found" });
  }
});

//Este endpoint me da el id de la rtdb para conectarme
//http:/localhost:3000/rooms/1732?userId=v1f5asd814312e
app.get("/rooms/:roomId", async (req, res) => {
  const { roomId } = req.params;
  const { userId } = req.query;

  const consultaUser = await userCollection.doc(userId.toString()).get();

  if (consultaUser.exists) {
    const consultaRoom = await roomCollection.doc(roomId.toString()).get();
    const data = await consultaRoom.data();
    console.log(data);

    res.status(200).json(data);
  } else {
    res.status(400).json({ message: "room not found" });
  }
});
//Agrega un player al room existente
app.post("/rooms/:roomId", async (req, res) => {
  const { roomId } = req.params;
  const { userId } = req.query;

  const consultaUser = await userCollection.doc(userId.toString()).get();
  const name = consultaUser.data().name;
  if (consultaUser.exists) {
    const consultaRoom = await roomCollection.doc(roomId.toString()).get();
    const data = await consultaRoom.data();
    console.log(data);

    const roomRef = await rtdb.ref("rooms/" + data.rtdbRoomId + "/currentGame");
    await roomRef.update({
      ["Player" + userId]: {
        online: true,
        start: false,
        choice: "",
        hystory: { victorias: 0, perdidas: 0 },
        name: name,
      },
    });

    res.status(200).json(data);
  } else {
    res.status(400).json({ message: "room not found" });
  }
});

//Setea el movimiento del jugador en la realTimeDB
app.post("/setmove", async (req, res) => {
  const { shortId } = req.body;
  const { userId } = req.body;
  const { jugada } = req.body;

  const consultaUser = await userCollection.doc(userId.toString()).get();

  if (consultaUser.exists) {
    const consultaRoom = await roomCollection.doc(shortId.toString()).get();
    const data = await consultaRoom.data();
    console.log(data);

    const roomRef = await rtdb.ref(
      "rooms/" + data.rtdbRoomId + "/currentGame/" + "Player" + userId
    );
    console.log(jugada);

    await roomRef.update({ choice: jugada });

    const data2 = await roomRef.get();

    res.status(200).json(data2);
  } else {
    res.status(400).json({ message: "room not found" });
  }
});
//Setea el score del jugador en la realTimeDB
app.post("/setscore", async (req, res) => {
  const { shortId } = req.body;
  const { userId } = req.body;
  const { hystory } = req.body;

  const consultaUser = await userCollection.doc(userId.toString()).get();

  if (consultaUser.exists) {
    const consultaRoom = await roomCollection.doc(shortId.toString()).get();
    const data = await consultaRoom.data();
    console.log(data);

    const roomRef = await rtdb.ref(
      "rooms/" + data.rtdbRoomId + "/currentGame/" + "Player" + userId
    );
    console.log(hystory);

    await roomRef.update({ hystory });

    const data2 = await roomRef.get();

    res.status(200).json(data2);
  } else {
    res.status(400).json({ message: "room not found" });
  }
});

//setea el start=true en la rtdb

app.post("/setstart", async (req, res) => {
  const { shortId } = req.body;
  const { userId } = req.body;
  const { start } = req.body;

  const consultaUser = await userCollection.doc(userId.toString()).get();

  if (consultaUser.exists) {
    const consultaRoom = await roomCollection.doc(shortId.toString()).get();
    const data = await consultaRoom.data();
    console.log(data);

    const roomRef = await rtdb.ref(
      "rooms/" + data.rtdbRoomId + "/currentGame/" + "Player" + userId
    );
    console.log(start);

    await roomRef.update({ start });

    const data2 = await roomRef.get();

    res.status(200).json(data2);
  } else {
    res.status(400).json({ message: "room not found" });
  }
});

app.use("*", (req, res) => {
  res.sendFile(rutaRelativa);
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
