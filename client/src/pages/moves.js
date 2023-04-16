"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initMoves = void 0;
var state_1 = require("../../state");
function initMoves(params) {
    var div = document.createElement("div");
    var style = document.createElement("style");
    var bgurl = new URL("../img/fondohorizontal.png", import.meta.url);
    var currentData = state_1.state.getData();
    var localStor = JSON.parse(localStorage.getItem("user"));
    console.log(localStor.moves);
    console.log(localStor.moves.myMove, localStor.moves.opponentMove, "ESTAS SON LAS JUGADAS");
    //const result = state.result(localStor.moves);
    style.innerHTML = "\n      .root {\n    background-image: url(".concat(bgurl, ");\n    margin: 0px;\n  }\n    .container{\n      height: 100vh;\n      display: flex;\n      align-content: center;\n      justify-content: space-between;\n      flex-direction: column;\n      align-items: center;\n    }\n    .opponentsPlay{\n      position: absolute;\n      top: -14px;\n      transform: rotate(180deg);\n    }\n    .myPlay{\n      position: absolute;\n      bottom: -6px;\n      \n    }\n    ");
    div.innerHTML = "\n   \n    \n     <div class=\"container\" >\n        <manos-comp class=\"opponentsPlay\" size=\"big\" type=\"".concat(localStor.moves.opponentMove, "\"></manos-comp>\n        <manos-comp class=\"myPlay\" size=\"big\" type=\"").concat(localStor.moves.myMove, "\" ></manos-comp>\n     </div>\n   \n   \n    ");
    state_1.state.result(localStor.moves);
    console.log(currentData, "despues del result");
    setTimeout(function () {
        params.goTo("/result");
    }, 6000);
    div.appendChild(style);
    return div;
}
exports.initMoves = initMoves;
