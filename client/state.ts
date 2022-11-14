import { throws } from "assert";
import { getDatabase, ref, onValue, app } from "./db";
import { onDisconnect } from "firebase/database";
import map from "lodash/map";
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

  listenRtdb(callback) {
    const currentData = this.getData();
    const db = getDatabase(app);
    console.log(currentData.rtdbId);

    const roomRef = ref(db, "rooms/" + currentData.rtdbId);

    onValue(roomRef, (snapshot) => {
      const data = snapshot.val();
      currentData.rtdbData = data;
      this.setData(currentData);
      console.log(data);
      console.log(currentData);
      callback();
    });
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
  getRtdb(callback) {
    const currentData = this.getData();
    fetch("/rooms/" + currentData.shortId + "?userId=" + currentData.userId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        currentData.rtdbId = data.rtdbRoomId;
        state.setData(currentData);
        console.log(currentData);
        callback();
      });
  },
  newRoom(name, callback) {
    const currentData = this.getData();
    console.log(currentData);

    fetch("/rooms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(currentData),
    })
      .then((response) => response.json())
      .then((data) => {
        currentData.shortId = data.shortId;
        console.log(currentData);
        this.setData(currentData);
        callback();
      });
  },
  setPlayer(callback) {
    const currentData = this.getData();
    console.log(currentData.rtdbData);
    let players = map(currentData.rtdbData.currentGame);
    let playersOnline = players.filter((e) => {
      return e.online == true;
    });
    console.log(playersOnline.length);
    if (playersOnline.length < 2) {
      fetch("/rooms/" + currentData.shortId + "?userId=" + currentData.userId, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentData),
      })
        .then((res) => res.json())
        .then((data) => {
          currentData.roomFull = false;
          state.setData(currentData);
          console.log(currentData);
          callback();
        });
    } else {
      console.log("sala llena");
      currentData.roomFull = true;
      state.setData(currentData);
      callback();
    }
  },
  getData() {
    return this.data;
  },
  setData(newData) {
    this.data = newData;
    for (const cb of this.liseners) {
      cb();
    }
    // console.log(this.data, "soy la data para storage");
    // console.log(newData);
    state.getData();

    const localStorageDatos = {
      name: newData.name,
      userId: newData.userId,
      shortId: newData.shortId,
    };

    localStorage.setItem("user", JSON.stringify(localStorageDatos));
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
  setName(name, callback) {
    const currentData = this.getData();

    if (currentData.name !== name) {
      state.getData();
      fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name }),
      })
        .then((response) => response.json())
        .then((data) => {
          const id = data.userId;
          currentData.name = name;
          currentData.userId = id;
          console.log(currentData);

          this.setData(currentData);
          callback();
          console.log("Success:", id);
        });
    }
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
