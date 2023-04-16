"use strict";
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
var express = require("express");
var dotenv = require("dotenv");
var cors = require("cors");
var db_1 = require("./db");
var path = require("path");
var nanoid_1 = require("nanoid");
var rutaRelativa = path.resolve(__dirname, "../dist", "index.html");
dotenv.config();
var port = process.env.PORT || 3000;
var app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("dist"));
var userCollection = db_1.db.collection("users");
var roomCollection = db_1.db.collection("rooms");
var historyCollection = db_1.db.collection("history");
app.get("/prueba", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var querySnapshot;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, userCollection.get()];
            case 1:
                querySnapshot = _a.sent();
                console.log(querySnapshot.docs[0].data());
                return [2 /*return*/];
        }
    });
}); });
app.get("/env", function (req, res) {
    console.log(process.env.GOOGLE_APPLICATION_CREDENTIALS);
    res.send(process.env.NODE_ENV);
});
//Este endpoint da de alta al user en la base de datos y le devuelve un id, si ya existe no permite crearlo
app.post("/signup", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var name, consulta, newUser, values, id;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                name = req.body.name;
                return [4 /*yield*/, userCollection.where("name", "==", name).get()];
            case 1:
                consulta = _a.sent();
                if (!consulta.empty) return [3 /*break*/, 3];
                return [4 /*yield*/, userCollection.add({ name: name })];
            case 2:
                newUser = _a.sent();
                newUser.update({ userId: newUser.id, name: name });
                res.status(201).json({ userId: newUser.id });
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, consulta.docs];
            case 4:
                values = _a.sent();
                id = values.forEach(function (e) {
                    var data = e.data();
                    res.json({ userId: data.userId });
                });
                _a.label = 5;
            case 5: return [2 /*return*/];
        }
    });
}); });
//Este endpoint crea un room en la RTDB y devuelve el id corto
app.post("/rooms", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, name, consulta, shortId, roomRef;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                userId = req.body.userId;
                name = req.body.name;
                return [4 /*yield*/, userCollection.doc(userId.toString()).get()];
            case 1:
                consulta = _b.sent();
                if (!consulta.exists) return [3 /*break*/, 5];
                shortId = (1000 + Math.floor(Math.random() * 999));
                return [4 /*yield*/, db_1.rtdb.ref("rooms/" + (0, nanoid_1.nanoid)())];
            case 2:
                roomRef = _b.sent();
                roomRef.set({
                    currentGame: (_a = {},
                        _a["Player" + userId] = {
                            online: true,
                            name: name,
                            start: false,
                            choice: "",
                        },
                        _a),
                });
                return [4 /*yield*/, roomCollection.doc(shortId.toString())];
            case 3: return [4 /*yield*/, (_b.sent()).set({
                    rtdbRoomId: roomRef.key,
                })];
            case 4:
                _b.sent();
                res.status(201).json({ shortId: shortId });
                return [3 /*break*/, 6];
            case 5:
                res.status(400).json({ message: "user not found" });
                _b.label = 6;
            case 6: return [2 /*return*/];
        }
    });
}); });
//Este endpoint me da el id de la rtdb para conectarme
//http:/localhost:3000/rooms/1732?userId=v1f5asd814312e
app.get("/rooms/:roomId", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var roomId, userId, consultaUser, consultaRoom, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                roomId = req.params.roomId;
                userId = req.query.userId;
                return [4 /*yield*/, userCollection.doc(userId.toString()).get()];
            case 1:
                consultaUser = _a.sent();
                if (!consultaUser.exists) return [3 /*break*/, 4];
                return [4 /*yield*/, roomCollection.doc(roomId.toString()).get()];
            case 2:
                consultaRoom = _a.sent();
                return [4 /*yield*/, consultaRoom.data()];
            case 3:
                data = _a.sent();
                console.log(data);
                res.status(200).json(data);
                return [3 /*break*/, 5];
            case 4:
                res.status(400).json({ message: "room not found" });
                _a.label = 5;
            case 5: return [2 /*return*/];
        }
    });
}); });
//Este endpoind confirma si la room existe en la bd
app.get("/room/:roomId", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var roomId, consultaRoom, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log(req.params.roomId);
                roomId = req.params.roomId;
                return [4 /*yield*/, roomCollection.doc(roomId.toString()).get()];
            case 1:
                consultaRoom = _a.sent();
                if (consultaRoom.exists) {
                    data = consultaRoom.data();
                    res.status(200).json({ message: "Room Existente", data: data });
                }
                else {
                    res.status(400).json("no existe esta room");
                }
                return [2 /*return*/];
        }
    });
}); });
//Agrega un player al room existente
app.post("/rooms/:roomId", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var roomId, userId, consultaUser, name, consultaRoom, data, roomRef;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                roomId = req.params.roomId;
                userId = req.query.userId;
                return [4 /*yield*/, userCollection.doc(userId.toString()).get()];
            case 1:
                consultaUser = _b.sent();
                name = consultaUser.data().name;
                if (!consultaUser.exists) return [3 /*break*/, 6];
                return [4 /*yield*/, roomCollection.doc(roomId.toString()).get()];
            case 2:
                consultaRoom = _b.sent();
                return [4 /*yield*/, consultaRoom.data()];
            case 3:
                data = _b.sent();
                console.log(data);
                return [4 /*yield*/, db_1.rtdb.ref("rooms/" + data.rtdbRoomId + "/currentGame")];
            case 4:
                roomRef = _b.sent();
                return [4 /*yield*/, roomRef.update((_a = {},
                        _a["Player" + userId] = {
                            online: true,
                            start: false,
                            choice: "",
                            name: name,
                        },
                        _a))];
            case 5:
                _b.sent();
                res.status(200).json(data);
                return [3 /*break*/, 7];
            case 6:
                res.status(400).json({ message: "room not found" });
                _b.label = 7;
            case 7: return [2 /*return*/];
        }
    });
}); });
//Este endpoint cambia el estado de online de la realTimeDataBse
app.post("/playeroff/:roomId", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var roomId, userId, consultaUser, name, consultaRoom, data, roomRef;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                roomId = req.params.roomId;
                userId = req.body.userId;
                console.log(userId);
                console.log("ESCUCHO EVENTO OFF SERVIDOR", userId);
                return [4 /*yield*/, userCollection.doc(userId.toString()).get()];
            case 1:
                consultaUser = _a.sent();
                console.log(consultaUser);
                name = consultaUser.data().name;
                if (!consultaUser.exists) return [3 /*break*/, 6];
                return [4 /*yield*/, roomCollection.doc(roomId.toString()).get()];
            case 2:
                consultaRoom = _a.sent();
                return [4 /*yield*/, consultaRoom.data()];
            case 3:
                data = _a.sent();
                console.log(data);
                return [4 /*yield*/, db_1.rtdb.ref("rooms/" + data.rtdbRoomId + "/currentGame/" + "Player" + userId)];
            case 4:
                roomRef = _a.sent();
                return [4 /*yield*/, roomRef.update({
                        online: false,
                        start: false,
                    })];
            case 5:
                _a.sent();
                res.status(200).json(data);
                return [3 /*break*/, 7];
            case 6:
                res.status(400).json({ message: "room not found" });
                _a.label = 7;
            case 7: return [2 /*return*/];
        }
    });
}); });
//Setea el movimiento del jugador en la realTimeDB
app.post("/setmove", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var shortId, userId, myMove, consultaUser, consultaRoom, data, roomRef, data2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                shortId = req.body.shortId;
                userId = req.body.userId;
                myMove = req.body.myMove;
                return [4 /*yield*/, userCollection.doc(userId.toString()).get()];
            case 1:
                consultaUser = _a.sent();
                if (!consultaUser.exists) return [3 /*break*/, 7];
                return [4 /*yield*/, roomCollection.doc(shortId.toString()).get()];
            case 2:
                consultaRoom = _a.sent();
                return [4 /*yield*/, consultaRoom.data()];
            case 3:
                data = _a.sent();
                console.log(data);
                return [4 /*yield*/, db_1.rtdb.ref("rooms/" + data.rtdbRoomId + "/currentGame/" + "Player" + userId)];
            case 4:
                roomRef = _a.sent();
                console.log(myMove);
                return [4 /*yield*/, roomRef.update({ choice: myMove })];
            case 5:
                _a.sent();
                return [4 /*yield*/, roomRef.get()];
            case 6:
                data2 = _a.sent();
                res.status(200).json(data2);
                return [3 /*break*/, 8];
            case 7:
                res.status(400).json({ message: "room not found" });
                _a.label = 8;
            case 8: return [2 /*return*/];
        }
    });
}); });
//Obtenemos el score de la room
app.get("/getscore/:shortId", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var name, history, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                name = req.body.name;
                console.log(name);
                return [4 /*yield*/, historyCollection.doc(req.params.shortId).get()];
            case 1:
                history = _a.sent();
                if (!history.exists) return [3 /*break*/, 3];
                return [4 /*yield*/, history.data()];
            case 2:
                data = _a.sent();
                console.log("el historial existente");
                console.log(data);
                res.status(200).json(data);
                return [3 /*break*/, 4];
            case 3:
                res.status(400).json("el historial no existe");
                _a.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); });
//Setea el score del jugador en la base de datos
app.post("/setscore/:shortId", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var shortId, results, history, newHistory;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                shortId = req.params.shortId;
                results = req.body;
                return [4 /*yield*/, historyCollection.doc(shortId).get()];
            case 1:
                history = _a.sent();
                console.log(history.exists);
                if (!history.exists) return [3 /*break*/, 2];
                historyCollection.doc(shortId).update(results);
                res.status(200).json({ message: "Historial is update" });
                return [3 /*break*/, 4];
            case 2:
                console.log("NO EXITE EL HISTORIAL");
                return [4 /*yield*/, historyCollection.doc(shortId).set(results)];
            case 3:
                newHistory = _a.sent();
                _a.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); });
//setea el start=true en la rtdb
app.post("/setstart", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var shortId, userId, start, consultaUser, consultaRoom, data, roomRef, data2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                shortId = req.body.shortId;
                userId = req.body.userId;
                start = req.body.start;
                return [4 /*yield*/, userCollection.doc(userId.toString()).get()];
            case 1:
                consultaUser = _a.sent();
                if (!consultaUser.exists) return [3 /*break*/, 7];
                return [4 /*yield*/, roomCollection.doc(shortId.toString()).get()];
            case 2:
                consultaRoom = _a.sent();
                return [4 /*yield*/, consultaRoom.data()];
            case 3:
                data = _a.sent();
                console.log(data);
                return [4 /*yield*/, db_1.rtdb.ref("rooms/" + data.rtdbRoomId + "/currentGame/" + "Player" + userId)];
            case 4:
                roomRef = _a.sent();
                return [4 /*yield*/, roomRef.update({ start: start })];
            case 5:
                _a.sent();
                return [4 /*yield*/, roomRef.get()];
            case 6:
                data2 = _a.sent();
                res.status(200).json({ start: start });
                return [3 /*break*/, 8];
            case 7:
                res.status(400).json({ message: "room not found" });
                _a.label = 8;
            case 8: return [2 /*return*/];
        }
    });
}); });
app.use("*", function (req, res) {
    res.sendFile(rutaRelativa);
});
app.listen(port, function () {
    console.log("Example app listening on port ".concat(port));
});
