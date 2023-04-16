"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.state = void 0;
const db_1 = require("./db");
const map_1 = require("lodash-es/map");
const filter_1 = require("lodash-es/filter");
exports.state = {
    data: {
        myMove: "",
        opponentMove: "",
        rtdbData: {},
        userId: "",
        shortId: "",
        name: "",
        start: false,
        roomFull: false,
        opponentHistory: {
            victorias: 0,
            perdidas: 0,
        },
        history: {
            name: {
                score: {
                    victorias: 0,
                    perdidas: 0,
                },
            },
            opponentName: {
                score: {
                    victorias: 0,
                    perdidas: 0,
                },
            },
        },
        opponentName: "",
        result: "",
    },
    liseners: [],
    timer: "open",
    listenRtdb(callbackFullRoom, callbackInstrucciones, callbackCompSala, callbackPlay) {
        const currentData = this.getData();
        const db = (0, db_1.getDatabase)(db_1.app);
        const roomRef = (0, db_1.ref)(db, "rooms/" + currentData.rtdbRoomId);
        (0, db_1.onValue)(roomRef, (snapshot) => {
            const data = snapshot.val();
            currentData.rtdbData = data;
            let localStor = JSON.parse(localStorage.getItem("user"));
            if (currentData.rtdbData.currentGame) {
                currentData.listenRtdb = true;
                this.setData(currentData);
                let playersOn = this.playersOnline();
                let playersStartOn = this.playersStart();
                let movesPlayers = this.playersMoves();
                Promise.all([playersOn, playersStartOn, movesPlayers]).then((values) => {
                    if (location.pathname == "/newGame" && values[0].length <= 2) {
                        callbackCompSala();
                    }
                    else if ((location.pathname == "/compartirSala" &&
                        values[0].length == 2) ||
                        (location.pathname == "/loginName" && values[0].length == 2)) {
                        callbackInstrucciones();
                    }
                    else if (location.pathname == "/wait" && values[1].length == 2) {
                        if (!currentData.historyBD) {
                            callbackPlay();
                        }
                        else {
                            callbackPlay();
                        }
                    }
                    else if (values[0].length > 2) {
                        callbackFullRoom();
                    }
                });
                return currentData;
            }
        });
    },
    async getRtdb() {
        const currentData = await this.getData();
        let response = await fetch("/rooms/" + currentData.shortId + "?userId=" + currentData.userId, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.ok) {
            let id = await response.json();
            currentData.rtdbRoomId = id.rtdbRoomId;
            this.setData(currentData);
        }
        return currentData;
    },
    async rtdbOnlineOff() {
        const currentData = await this.getData();
        let response = await fetch("/playeroff/" + currentData.shortId, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(currentData),
        });
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
        }
        catch (error) {
            console.log("algo salio mal al crear el room");
        }
        return currentData;
    },
    async getRoom(roomId, callback) {
        const currentData = await this.getData();
        const room = await fetch("/room/" + roomId, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (room.ok) {
            const res = await room.json();
            callback();
        }
        else {
            alert("no existe la room");
        }
    },
    async playersMoves() {
        const currentData = await this.getData();
        let players = (0, map_1.default)(currentData.rtdbData.currentGame);
        //console.log(players, "los players existentes");
        let playersMoves = players.filter((e) => {
            return e.choice;
        });
        let localStor = JSON.parse(localStorage.getItem("user"));
        if (playersMoves.length == 2) {
            const myPlay = playersMoves.filter((e) => {
                return e.name == localStor.name;
            });
            const opponentMove = playersMoves.filter((e) => {
                return e.name !== localStor.name;
            });
            currentData.myMove = myPlay[0].choice;
            currentData.opponentMove = opponentMove[0].choice;
            currentData.opponentName = opponentMove[0].name;
            exports.state.setData(currentData);
            exports.state.getData();
        }
        return playersMoves;
    },
    async playersOnline() {
        const currentData = await this.getData();
        let players = (0, map_1.default)(currentData.rtdbData.currentGame);
        let playersOnline = players.filter((e) => {
            return e.online;
        });
        return playersOnline;
    },
    async playersStart() {
        const currentData = await this.getData();
        let players = (0, map_1.default)(currentData.rtdbData.currentGame);
        let playersStart = players.filter((e) => {
            return e.start == true;
        });
        return playersStart;
    },
    setPlayer() {
        const currentData = this.getData();
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
            exports.state.setData(currentData);
        });
    },
    setStart(estado, callbackWait) {
        const currentData = this.getData();
        const datos = {
            start: estado,
            shortId: currentData.shortId,
            userId: currentData.userId,
        };
        console.log(currentData, "el currentData Set PLAYER");
        fetch("/setstart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datos),
        })
            .then((res) => {
            res.json();
        })
            .then((data) => {
            callbackWait();
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
        const localStorageDatos = {
            name: newData.name,
            opponentName: newData.opponentName,
            userId: newData.userId,
            shortId: newData.shortId,
            start: newData.start,
            moves: {
                myMove: newData.myMove,
                opponentMove: newData.opponentMove,
            },
            history: newData.history,
        };
        localStorage.setItem("user", JSON.stringify(localStorageDatos));
    },
    setMyMove(myMove) {
        const currentData = this.getData();
        this.setData({
            ...currentData,
            myMove,
        });
        const datos = {
            myMove: myMove,
            shortId: currentData.shortId,
            userId: currentData.userId,
        };
        fetch("/setmove", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datos),
        })
            .then((res) => {
            return res.json();
        })
            .then((data) => {
            currentData.myMove = data.choice;
            exports.state.setData(currentData);
        })
            .catch((err) => {
            console.log(err);
        });
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
        }
        catch (err) {
            console.log(err);
            console.log("algo salio mal al crear el newUser");
        }
        return currentData;
    },
    getOpponnetInfo() {
        const currentData = this.getData();
        const currentGame = currentData.rtdbData.currentGame;
        const opponent = (0, filter_1.default)(currentGame, (e) => {
            return e.name !== currentData.name;
        });
        const opponentName = opponent[0].name;
        currentData.opponentName = opponentName;
        this.setData(currentData);
    },
    async getHistory() {
        const currentData = await this.getData();
        const result = await fetch("/getscore/" + currentData.shortId, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (result.ok) {
            const historialBd = await result.json();
            currentData.history = historialBd;
            this.setData(currentData);
        }
        else {
            const historialBd = await result.json();
            const myScore = {
                [currentData.name]: { score: { victorias: 0, perdidas: 0 } },
                [currentData.opponentName ? currentData.opponentName : "offline"]: {
                    score: { victorias: 0, perdidas: 0 },
                },
            };
            currentData.history = myScore;
            this.setData(currentData);
        }
    },
    async setHistory(history) {
        const currentData = await this.getData();
        const respuesta = await fetch("/setscore/" + currentData.shortId, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(history),
        });
        if (respuesta.ok) {
            const resultadoBD = await respuesta.json();
            console.log(resultadoBD);
        }
    },
    async setResult() { },
    result(moves) {
        const currentData = this.getData();
        const ganeConPiedra = moves.myMove == "piedra" && moves.opponentMove == "tijera";
        const ganeConPapel = moves.myMove == "papel" && moves.opponentMove == "piedra";
        const ganeConTijera = moves.myMove == "tijera" && moves.opponentMove == "papel";
        const perdiConPiedra = moves.myMove == "piedra" && moves.opponentMove == "papel";
        const perdiConPapel = moves.myMove == "papel" && moves.opponentMove == "tijera";
        const perdiConTijera = moves.myMove == "tijera" && moves.opponentMove == "piedra";
        const empate = moves.myMove == moves.opponentMove;
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
                currentData.result = "victoria";
                currentData.history[currentData.name].score.victorias++;
                currentData.history[currentData.opponentName].score.perdidas++;
                this.setData(currentData);
            }
            else if (element == true && (index == 3 || index == 4 || index == 5)) {
                currentData.result = "perdiste";
                currentData.history[currentData.name].score.perdidas++;
                currentData.history[currentData.opponentName].score.victorias++;
                this.setData(currentData);
            }
            else if (element == true && index == 6) {
                currentData.result = "empate";
                this.setData(currentData);
            }
        }
    },
    subscribe(callback) {
        this.liseners.push(callback);
    },
};
