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
exports.initPageNewGame = void 0;
var state_1 = require("../../state");
function initPageNewGame(params) {
    var div = document.createElement("div");
    var style = document.createElement("style");
    var bgurl = new URL("../img/fondohorizontal.png", import.meta.url);
    style.innerHTML = "\n  .root {\n  background-image: url(".concat(bgurl, ");\n  margin: 0px;\n}\n  .container{\n    width: 100%;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    height: 100vh;\n    justify-content: center;\n}\n  .hands{\n        position: absolute;\n        bottom: -37px;\n  }\n   .text{\n     margin-top:-40px;;\n     width: 300px;\n   }\n  \n  .container-button{\n     margin-top:41px;\n     display:flex;\n     flex-direction: column;\n     gap:20px;    \n    }\n   @media (min-width:769px){\n     .container-button{\n      gap:39px;\n     }\n  \n}\n\n  ");
    div.classList.add(".root");
    div.innerHTML = "\n      <text-comp class=\"text\" type=\"root\">Piedra Papel o Tijera</text-comp>\n      <input-comp  type=\"nombre\" class=\"inputComp\"></input-comp>\n      <div class=\"hands\">\n       <manos-comp ></manos-comp>\n      </div>\n  ";
    function goTo() {
        state_1.state.listenRtdb(function () {
            params.goTo("/fullRoom");
        }, function () {
            params.goTo("/instruction");
        }, function () {
            params.goTo("/compartirSala");
        }, function () {
            params.goTo("/play");
        });
    }
    function setNameRoom(name) {
        return __awaiter(this, void 0, void 0, function () {
            var id, shortId, rtdbId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, state_1.state.setName(name)];
                    case 1:
                        id = _a.sent();
                        if (!(id.name == "")) return [3 /*break*/, 2];
                        alert("este user no esta disponible");
                        return [3 /*break*/, 5];
                    case 2: return [4 /*yield*/, state_1.state.newRoom()];
                    case 3:
                        shortId = _a.sent();
                        return [4 /*yield*/, state_1.state.getRtdb()];
                    case 4:
                        rtdbId = _a.sent();
                        state_1.state.getHistory();
                        goTo();
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    }
    var formEl = div.querySelector(".form");
    formEl.addEventListener("submit", function (e) {
        e.preventDefault();
        var target = e.target;
        var name = target.name.value;
        setNameRoom(name);
    });
    div.classList.add("container");
    div.appendChild(style);
    return div;
}
exports.initPageNewGame = initPageNewGame;