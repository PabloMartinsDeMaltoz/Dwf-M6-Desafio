"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.state = void 0;
var db_1 = require("./db");
var map_1 = require("lodash-es/map");
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
    listenRtdb: function (callbackFullRoom, callbackInstrucciones, callbackCompSala, callbackPlay) {
        var _this = this;
        var currentData = this.getData();
        var db = (0, db_1.getDatabase)(db_1.app);
        var roomRef = (0, db_1.ref)(db, "rooms/" + currentData.rtdbRoomId);
        (0, db_1.onValue)(roomRef, function (snapshot) {
            var data = snapshot.val();
            currentData.rtdbData = data;
            var localStor = JSON.parse(localStorage.getItem("user"));
            if (currentData.rtdbData.currentGame) {
                currentData.listenRtdb = true;
                _this.setData(currentData);
                var playersOn = _this.playersOnline();
                var playersStartOn = _this.playersStart();
                var movesPlayers = _this.playersMoves();
                Promise.all([playersOn, playersStartOn, movesPlayers]).then(function (values) {
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
    getRtdb: function () {
        return __awaiter(this, void 0, void 0, function () {
            var currentData, response, id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getData()];
                    case 1:
                        currentData = _a.sent();
                        return [4 /*yield*/, fetch("/rooms/" + currentData.shortId + "?userId=" + currentData.userId, {
                                method: "GET",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                            })];
                    case 2:
                        response = _a.sent();
                        if (!response.ok) return [3 /*break*/, 4];
                        return [4 /*yield*/, response.json()];
                    case 3:
                        id = _a.sent();
                        currentData.rtdbRoomId = id.rtdbRoomId;
                        this.setData(currentData);
                        _a.label = 4;
                    case 4: return [2 /*return*/, currentData];
                }
            });
        });
    },
    rtdbOnlineOff: function () {
        return __awaiter(this, void 0, void 0, function () {
            var currentData, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getData()];
                    case 1:
                        currentData = _a.sent();
                        return [4 /*yield*/, fetch("/playeroff/" + currentData.shortId, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(currentData),
                            })];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    },
    newRoom: function () {
        return __awaiter(this, void 0, void 0, function () {
            var currentData, newRoom, respuesta, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getData()];
                    case 1:
                        currentData = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 6, , 7]);
                        return [4 /*yield*/, fetch("/rooms", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(currentData),
                            })];
                    case 3:
                        newRoom = _a.sent();
                        if (!newRoom.ok) return [3 /*break*/, 5];
                        return [4 /*yield*/, newRoom.json()];
                    case 4:
                        respuesta = _a.sent();
                        currentData.shortId = respuesta.shortId;
                        this.setData(currentData);
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_1 = _a.sent();
                        console.log("algo salio mal al crear el room");
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/, currentData];
                }
            });
        });
    },
    getRoom: function (roomId, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var currentData, room, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getData()];
                    case 1:
                        currentData = _a.sent();
                        return [4 /*yield*/, fetch("/room/" + roomId, {
                                method: "GET",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                            })];
                    case 2:
                        room = _a.sent();
                        if (!room.ok) return [3 /*break*/, 4];
                        return [4 /*yield*/, room.json()];
                    case 3:
                        res = _a.sent();
                        callback();
                        return [3 /*break*/, 5];
                    case 4:
                        alert("no existe la room");
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    },
    playersMoves: function () {
        return __awaiter(this, void 0, void 0, function () {
            var currentData, players, playersMoves, localStor, myPlay, opponentMove;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getData()];
                    case 1:
                        currentData = _a.sent();
                        players = (0, map_1.default)(currentData.rtdbData.currentGame);
                        playersMoves = players.filter(function (e) {
                            return e.choice;
                        });
                        localStor = JSON.parse(localStorage.getItem("user"));
                        if (playersMoves.length == 2) {
                            myPlay = playersMoves.filter(function (e) {
                                return e.name == localStor.name;
                            });
                            opponentMove = playersMoves.filter(function (e) {
                                return e.name !== localStor.name;
                            });
                            currentData.myMove = myPlay[0].choice;
                            currentData.opponentMove = opponentMove[0].choice;
                            currentData.opponentName = opponentMove[0].name;
                            exports.state.setData(currentData);
                            exports.state.getData();
                        }
                        return [2 /*return*/, playersMoves];
                }
            });
        });
    },
    playersOnline: function () {
        return __awaiter(this, void 0, void 0, function () {
            var currentData, players, playersOnline;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getData()];
                    case 1:
                        currentData = _a.sent();
                        players = (0, map_1.default)(currentData.rtdbData.currentGame);
                        playersOnline = players.filter(function (e) {
                            return e.online;
                        });
                        return [2 /*return*/, playersOnline];
                }
            });
        });
    },
    playersStart: function () {
        return __awaiter(this, void 0, void 0, function () {
            var currentData, players, playersStart;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getData()];
                    case 1:
                        currentData = _a.sent();
                        players = (0, map_1.default)(currentData.rtdbData.currentGame);
                        playersStart = players.filter(function (e) {
                            return e.start == true;
                        });
                        return [2 /*return*/, playersStart];
                }
            });
        });
    },
    setPlayer: function () {
        var currentData = this.getData();
        fetch("/rooms/" + currentData.shortId + "?userId=" + currentData.userId, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(currentData),
        })
            .then(function (res) { return res.json(); })
            .then(function (data) {
            currentData.roomFull = true;
            exports.state.setData(currentData);
        });
    },
    setStart: function (estado, callbackWait) {
        var currentData = this.getData();
        var datos = {
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
            .then(function (res) {
            res.json();
        })
            .then(function (data) {
            callbackWait();
        })
            .catch(function (err) {
            console.log(err);
        });
    },
    getData: function () {
        return this.data;
    },
    setData: function (newData) {
        this.data = newData;
        for (var _i = 0, _a = this.liseners; _i < _a.length; _i++) {
            var cb = _a[_i];
            cb();
        }
        var localStorageDatos = {
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
    setMyMove: function (myMove) {
        var currentData = this.getData();
        this.setData(__assign(__assign({}, currentData), { myMove: myMove }));
        var datos = {
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
            .then(function (res) {
            return res.json();
        })
            .then(function (data) {
            currentData.myMove = data.choice;
            exports.state.setData(currentData);
        })
            .catch(function (err) {
            console.log(err);
        });
    },
    setName: function (nombre) {
        return __awaiter(this, void 0, void 0, function () {
            var currentData, response, respuesta, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getData()];
                    case 1:
                        currentData = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 6, , 7]);
                        return [4 /*yield*/, fetch("/signup", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({ name: nombre }),
                            })];
                    case 3:
                        response = _a.sent();
                        if (!response.ok) return [3 /*break*/, 5];
                        return [4 /*yield*/, response.json()];
                    case 4:
                        respuesta = _a.sent();
                        currentData.name = nombre;
                        currentData.userId = respuesta.userId;
                        this.setData(currentData);
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        err_1 = _a.sent();
                        console.log(err_1);
                        console.log("algo salio mal al crear el newUser");
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/, currentData];
                }
            });
        });
    },
    getOpponnetInfo: function () {
        var currentData = this.getData();
        var currentGame = currentData.rtdbData.currentGame;
        var opponent = filter(currentGame, function (e) {
            return e.name !== currentData.name;
        });
        var opponentName = opponent[0].name;
        currentData.opponentName = opponentName;
        this.setData(currentData);
    },
    getHistory: function () {
        return __awaiter(this, void 0, void 0, function () {
            var currentData, result, historialBd, historialBd, myScore;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.getData()];
                    case 1:
                        currentData = _b.sent();
                        return [4 /*yield*/, fetch("/getscore/" + currentData.shortId, {
                                method: "GET",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                            })];
                    case 2:
                        result = _b.sent();
                        if (!result.ok) return [3 /*break*/, 4];
                        return [4 /*yield*/, result.json()];
                    case 3:
                        historialBd = _b.sent();
                        currentData.history = historialBd;
                        this.setData(currentData);
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, result.json()];
                    case 5:
                        historialBd = _b.sent();
                        myScore = (_a = {},
                            _a[currentData.name] = { score: { victorias: 0, perdidas: 0 } },
                            _a[currentData.opponentName ? currentData.opponentName : "offline"] = {
                                score: { victorias: 0, perdidas: 0 },
                            },
                            _a);
                        currentData.history = myScore;
                        this.setData(currentData);
                        _b.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    },
    setHistory: function (history) {
        return __awaiter(this, void 0, void 0, function () {
            var currentData, respuesta, resultadoBD;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getData()];
                    case 1:
                        currentData = _a.sent();
                        return [4 /*yield*/, fetch("/setscore/" + currentData.shortId, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(history),
                            })];
                    case 2:
                        respuesta = _a.sent();
                        if (!respuesta.ok) return [3 /*break*/, 4];
                        return [4 /*yield*/, respuesta.json()];
                    case 3:
                        resultadoBD = _a.sent();
                        console.log(resultadoBD);
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    },
    setResult: function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    },
    result: function (moves) {
        var currentData = this.getData();
        var ganeConPiedra = moves.myMove == "piedra" && moves.opponentMove == "tijera";
        var ganeConPapel = moves.myMove == "papel" && moves.opponentMove == "piedra";
        var ganeConTijera = moves.myMove == "tijera" && moves.opponentMove == "papel";
        var perdiConPiedra = moves.myMove == "piedra" && moves.opponentMove == "papel";
        var perdiConPapel = moves.myMove == "papel" && moves.opponentMove == "tijera";
        var perdiConTijera = moves.myMove == "tijera" && moves.opponentMove == "piedra";
        var empate = moves.myMove == moves.opponentMove;
        var arrayResults = [
            ganeConPapel,
            ganeConPiedra,
            ganeConTijera,
            perdiConPapel,
            perdiConPiedra,
            perdiConTijera,
            empate,
        ];
        for (var index = 0; index < arrayResults.length; index++) {
            var element = arrayResults[index];
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
    subscribe: function (callback) {
        this.liseners.push(callback);
    },
};
