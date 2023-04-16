"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initPageE = void 0;
var state_1 = require("../../state");
function initPageE(params) {
    var _a;
    var div = document.createElement("div");
    var style = document.createElement("style");
    var bgurl = new URL("../img/fondohorizontal.png", import.meta.url);
    var currentData = state_1.state.getData();
    style.innerHTML = "\n  .root {\n  \n}\n.rootWin{\n      background-color: #888949E5;\n}\n.rootLose{\n      background-color:#894949E5;\n}\n.rootTie{\n      background-color:rgba(127,127,127,0.9);\n}\n  .rootE{\n    height:100vh;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    gap:20px;\n} \n   .text{\n     margin-botton:74px;\n   }\n   .boton-jugar .boton-home{\n     margin-top:21px;\n   }\n     .container{\n    display: flex;\n    align-content: center;\n    justify-content: space-between;\n    flex-direction: column;\n    align-items: center;\n  \n  }\n  .pcPlay{\n    position: absolute;\n    top: -14px;\n     transform: rotate(180deg);\n      z-index:-1;\n     \n  }\n  .myPlay{\n    position: absolute;\n    bottom: -6px;\n    z-index:-1;\n   \n}\n\n\n  }\n  ";
    div.classList.add("root");
    div.innerHTML = "\n  \n  <div class=\"rootE\">\n   <star-comp type=\"".concat(currentData.result, "\"></star-comp>\n   <score-comp myScore=\"").concat(currentData.history[currentData.name].score.victorias, "\" pcScore=\"").concat(currentData.history[currentData.name].score.perdidas, "\"></score-comp>\n   <button-comp class=\"boton-jugar\">Volver a jugar</button-comp>\n   <button-comp class=\"boton-home\">Home</button-comp>\n  </div> \n  <div class=\"container\" >\n     <manos-comp class=\"pcPlay\" size=\"big\" type=\"").concat(currentData.opponentMove, "\"></manos-comp>\n     <manos-comp class=\"myPlay\" size=\"big\" type=\"").concat(currentData.myMove, "\"></manos-comp>\n  </div>\n  ");
    console.log("OPPONENT HISTORY");
    console.log(currentData.history[currentData.opponentName].score);
    state_1.state.setHistory((_a = {},
        _a[currentData.name] = {
            score: {
                victorias: currentData.history[currentData.name].score.victorias,
                perdidas: currentData.history[currentData.name].score.perdidas,
            },
        },
        _a[currentData.opponentName] = {
            score: {
                victorias: currentData.history[currentData.opponentName].score.victorias,
                perdidas: currentData.history[currentData.opponentName].score.perdidas,
            },
        },
        _a));
    state_1.state.setStart(false);
    var botonJugarEl = div.querySelector(".boton-jugar");
    botonJugarEl.addEventListener("click", function () {
        currentData.myMove = "";
        currentData.opponentMove = "";
        state_1.state.setData(currentData);
        state_1.state.playersMoves();
        params.goTo("/instruction");
    });
    var botonHomeEl = div.querySelector(".boton-home");
    botonHomeEl.addEventListener("click", function () {
        currentData.myMove = "";
        currentData.online = "";
        currentData.opponentMove = "";
        state_1.state.rtdbOnlineOff();
        state_1.state.setData(currentData);
        params.goTo("/welcome");
    });
    div.appendChild(style);
    if (currentData.result == "victoria") {
        div.classList.replace("root" || "rootTie" || "rootLose", "rootWin");
    }
    else if (currentData.result == "perdiste") {
        div.classList.replace("root" || "rootTie" || "rootWin", "rootLose");
    }
    else if (currentData.result == "empate") {
        div.classList.replace("root" || "rootWin" || "rootLose", "rootTie");
    }
    return div;
}
exports.initPageE = initPageE;
