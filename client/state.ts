type move = "piedra" | "papel" | "tijera" | "";
type game = {
  myMove: "";
  pcMove: "";
};

export const state = {
  data: {
    myMove: "",
    pcMove: "",
    currentGame: "none",
    history: { victorias: 0, perdidas: 0 },
  },
  liseners: [],
  timer: "open",

  init() {
    const data = JSON.parse(localStorage.getItem("puntajes"));
    if (data) {
      this.setData(data);
    } else this.setData(this.data);
  },
  getData() {
    return this.data;
  },
  setData(newData) {
    this.data = newData;
    for (const cb of this.liseners) {
      cb();
    }
    if (newData.history) {
      const localStorageDatos = {
        history: newData.history,
        currentGame: newData.currentGame,
        myMove: newData.myMove,
        pcMove: newData.pcMove,
      };
      localStorage.setItem("puntajes", JSON.stringify(localStorageDatos));
    }
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
