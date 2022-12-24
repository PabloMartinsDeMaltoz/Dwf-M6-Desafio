import { throws } from "assert";
import { getDatabase, ref, onValue, app } from "./db";
import { onDisconnect } from "firebase/database";
import map from "lodash/map";
import { callbackify } from "util";

type move = "piedra" | "papel" | "tijera" | "";
type game = {
  myMove: "";
  pcMove: "";
};

export const state = {
  data: {
    rtdbData: {},
    userId: "",
    shortId: "",
    name: "",

    roomFull: false,
  },
  liseners: [],
  timer: "open",

  listenRtdb(callbackFullRoom, callbackInstrucciones, callbackCompSala) {
    const currentData = this.getData();
    const db = getDatabase(app);
    const roomRef = ref(db, "rooms/" + currentData.rtdbRoomId);
    console.log(currentData);

    onValue(roomRef, (snapshot) => {
      const data = snapshot.val();
      currentData.rtdbData = data;

      if (currentData.rtdbData.currentGame) {
        currentData.listenRtdb = true;
        this.setData(currentData);
        let playersOn = this.playersOnline();

        playersOn
          .then((r) => {
            return r;
          })
          .then((res) => {
            console.log(res.length, "soy el lenght");
            console.log(location.pathname, "soy el pathname");

            if (location.pathname == "/newGame" && res.length <= 2) {
              callbackCompSala();
            } else if (
              (location.pathname == "/instruction" && res.length > 2) ||
              (location.pathname == "/compartirSala" && res.length == 2) ||
              (location.pathname == "/loginName" && res.length <= 2)
            ) {
              callbackInstrucciones();
            } else {
              callbackFullRoom();
            }
          });
      }
    });

    return currentData;
    /*
    const connectedRef = ref(db, ".info/connected")
    onValue(connectedRef, (snap) => {
      if (snap.val() === true) {
        const currentGame = currentData.rtdbData.currentGame;
        let userConnected = map(currentGame, (user) => {});
        console.log("connected");
      } else {
        console.log("not connected");
      }
    })*/
  },

  init() {
    const data = JSON.parse(localStorage.getItem("user"));
    if (data) {
      this.setData(data);
    } else this.setData(this.data);
  },
  async getRtdb() {
    const currentData = await this.getData();

    let response = await fetch(
      "/rooms/" + currentData.shortId + "?userId=" + currentData.userId,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      let id = await response.json();
      currentData.rtdbRoomId = id.rtdbRoomId;
      this.setData(currentData);
    }
    return currentData;
  },
  async newRoom() {
    const currentData = await this.getData();
    try {
      const newRoom = await fetch("/rooms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentData),
      });
      if (newRoom.ok) {
        const respuesta = await newRoom.json();
        currentData.shortId = respuesta.shortId;
        this.setData(currentData);
      }

      /*
        .then((response) => response.json())
        .then((data) => {
          currentData.shortId = data.shortId;
          this.setData(currentData);
        });
      */
    } catch (error) {
      console.log("algo salio mal");
    }
    return currentData;
  },

  async playersOnline() {
    const currentData = await this.getData();
    console.log(currentData.rtdbData, "la data del momento");

    let players = map(currentData.rtdbData.currentGame);
    console.log(players, "los players existentes");

    let playersOnline = players.filter((e) => {
      return e.online;
    });
    console.log(playersOnline, playersOnline.length, "son los players online");

    return playersOnline;
  },
  setPlayer() {
    const currentData = this.getData();
    console.log(currentData);

    fetch("/rooms/" + currentData.shortId + "?userId=" + currentData.userId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(currentData),
    })
      .then((res) => res.json())
      .then((data) => {
        currentData.roomFull = true;
        state.setData(currentData);
        console.log(currentData);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  setStart() {
    const currentData = this.getData();
    currentData.start = true;
    console.log(currentData);

    fetch("/setscore", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(currentData),
    })
      .then((res) => res.json())
      .then((data) => {
       
        state.setData(currentData);
        console.log(currentData);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  getData() {
    return this.data;
  },
  setData(newData) {
    this.data = newData;
    for (const cb of this.liseners) {
      cb();
    }
    /* const localStorageDatos = {
      name: newData.name,
      userId: newData.userId,
      shortId: newData.shortId,
    };
    localStorage.setItem("user", JSON.stringify(localStorageDatos));
  }*/
  },
  setMyMove(myMove) {
    const currentData = this.getData();
    this.setData({
      ...currentData,
      myMove,
    });
  },
  setPcMove() {
    const currentData = this.getData();
    const moves = ["piedra", "papel", "tijera"];
    const numberAleatorio = Math.floor(Math.random() * (4 - 1));
    const pcMove = moves[numberAleatorio];
    if (this.timer == "open") {
      this.setData({
        ...currentData,
        pcMove,
      });
    }
  },
  async setName(nombre) {
    const currentData = await this.getData();
    try {
      const response = await fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: nombre }),
      });
      if (response.ok) {
        const respuesta = await response.json();
        currentData.name = nombre;
        currentData.userId = respuesta.userId;
        this.setData(currentData);
      }
    } catch (error) {
      alert("user already exist");
      console.log(error);
    }
    return currentData;
  },

  result(moves) {
    this.init();
    const currentData = this.getData();
    const ganeConPiedra = moves.myMove == "piedra" && moves.pcMove == "tijera";
    const ganeConPapel = moves.myMove == "papel" && moves.pcMove == "piedra";
    const ganeConTijera = moves.myMove == "tijera" && moves.pcMove == "papel";

    const perdiConPiedra = moves.myMove == "piedra" && moves.pcMove == "papel";
    const perdiConPapel = moves.myMove == "papel" && moves.pcMove == "tijera";
    const perdiConTijera = moves.myMove == "tijera" && moves.pcMove == "piedra";

    const empate = moves.myMove == moves.pcMove;

    const arrayResults = [
      ganeConPapel,
      ganeConPiedra,
      ganeConTijera,
      perdiConPapel,
      perdiConPiedra,
      perdiConTijera,
      empate,
    ];

    for (let index = 0; index < arrayResults.length; index++) {
      const element = arrayResults[index];
      if (element == true && (index == 0 || index == 1 || index == 2)) {
        currentData.currentGame = "victoria";
        currentData.history.victorias++;
        this.setData(currentData);
      } else if (element == true && (index == 3 || index == 4 || index == 5)) {
        currentData.currentGame = "perdiste";
        currentData.history.perdidas++;
        this.setData(currentData);
      } else if (element == true && index == 6) {
        currentData.currentGame = "empate";
        this.setData(currentData);
      }
    }
  },
  subscribe(callback) {
    this.liseners.push(callback);
  },
};
