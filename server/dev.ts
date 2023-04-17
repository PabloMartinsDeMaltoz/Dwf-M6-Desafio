import * as express from "express";
import * as dotenv from "dotenv";
import * as cors from "cors";
import { db, rtdb } from "./db";
import * as path from "path";
import { nanoid } from "nanoid";
import * as _ from "lodash";

const rutaRelativa = path.resolve(__dirname, "../dist", "index.html");
dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("dist"));

const userCollection = db.collection("users");
const roomCollection = db.collection("rooms");
const historyCollection = db.collection("history");

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
    const values = await consulta.docs;
    const id = values.forEach((e) => {
      const data = e.data();

      res.json({ userId: data.userId });
    });
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
//Este endpoind confirma si la room existe en la bd
app.get("/room/:roomId", async (req, res) => {
  console.log(req.params.roomId);

  const { roomId } = req.params;
  const consultaRoom = await roomCollection.doc(roomId.toString()).get();
  if (consultaRoom.exists) {
    const data = consultaRoom.data();

    res.status(200).json({ message: "Room Existente", data: data });
  } else {
    res.status(400).json("no existe esta room");
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
        name: name,
      },
    });

    res.status(200).json(data);
  } else {
    res.status(400).json({ message: "room not found" });
  }
});
//Este endpoint cambia el estado de online de la realTimeDataBse
app.post("/playeroff/:roomId", async (req, res) => {
  const { roomId } = req.params;
  const { userId } = req.body;
  
  const consultaUser = await userCollection.doc(userId.toString()).get();

  const name = consultaUser.data().name;
  if (consultaUser.exists) {
    const consultaRoom = await roomCollection.doc(roomId.toString()).get();
    const data = await consultaRoom.data();
    console.log(data);

    const roomRef = await rtdb.ref(
      "rooms/" + data.rtdbRoomId + "/currentGame/" + "Player" + userId
    );
    await roomRef.update({
      online: false,
      start: false,
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
  const { myMove } = req.body;

  const consultaUser = await userCollection.doc(userId.toString()).get();

  if (consultaUser.exists) {
    const consultaRoom = await roomCollection.doc(shortId.toString()).get();
    const data = await consultaRoom.data();
    console.log(data);

    const roomRef = await rtdb.ref(
      "rooms/" + data.rtdbRoomId + "/currentGame/" + "Player" + userId
    );
    console.log(myMove);

    await roomRef.update({ choice: myMove });

    const data2 = await roomRef.get();

    res.status(200).json(data2);
  } else {
    res.status(400).json({ message: "room not found" });
  }
});

//Obtenemos el score de la room
app.get("/getscore/:shortId", async (req, res) => {
  const { name } = req.body;
  console.log(name);

  const history = await historyCollection.doc(req.params.shortId).get();
  if (history.exists) {
    const data = await history.data();
    console.log("el historial existente");

    console.log(data);

    res.status(200).json(data);
  } else {
    res.status(400).json("el historial no existe");
  }
});

//Setea el score del jugador en la base de datos
app.post("/setscore/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const results = req.body; //Nueva data para sumar en la BD
  const history = await historyCollection.doc(shortId).get();
  console.log(history.exists);
  if (history.exists) {
    historyCollection.doc(shortId).update(results);
    res.status(200).json({ message: "Historial is update" });
  } else {
    console.log("NO EXITE EL HISTORIAL");
    const newHistory = await historyCollection.doc(shortId).set(results);
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

    await roomRef.update({ start });

    const data2 = await roomRef.get();

    res.status(200).json({ start: start });
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
