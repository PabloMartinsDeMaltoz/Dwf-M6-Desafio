"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initPlay = void 0;
var state_1 = require("../../state");
function initPlay(params) {
    var div = document.createElement("div");
    var style = document.createElement("style");
    var bgurl = new URL("../img/fondohorizontal.png", import.meta.url);
    var currentData = state_1.state.getData();
    style.innerHTML = "\n   .root {\n  background-image: url(".concat(bgurl, ");\n  margin: 0px;\n}\n  .rootC{\n    width:100%;\n  }\n  .center{\n        padding: 125px 0px;\n        width: 100%;\n        display: flex;\n        justify-content: center;\n  }\n  .container{\n    height: 100vh;\n    display: flex;\n    flex-direction: column;\n    justify-content: space-between;\n    align-content: center;\n    align-items: center;\n  }\n   .container-hands{\n    \n    display: flex;\n    flex-direction: row;\n    justify-content: center;\n   }\n    @media (min-width:769px){\n     .container-hands{\n      gap:39px;\n     }\n\n   .text{\n     margin-botton:74px;\n   }\n     .hands{\n       height:200px;\n       display:flex;\n       bottom: -37px;\n  }\n  ");
    div.innerHTML = "\n  <timer-comp></timer-comp>\n  <div class=\"hands\">\n   <div class=\"container-hands\">\n   <manos-comp size=\"med\" type=\"tijera\"></manos-comp>\n   <manos-comp size=\"med\" type=\"piedra\"></manos-comp>\n   <manos-comp size=\"med\" type=\"papel\"></manos-comp>\n   </div> \n  </div>\n  ";
    state_1.state.setMyMove("");
    var opcionElejida = div.getElementsByTagName("manos-comp");
    var timer = div.getElementsByTagName("timer-comp");
    for (var _i = 0, opcionElejida_1 = opcionElejida; _i < opcionElejida_1.length; _i++) {
        var op = opcionElejida_1[_i];
        op.addEventListener("click", function (e) {
            var myMove = e.target.getAttribute("type") || "";
            state_1.state.setMyMove(myMove);
            if (state_1.state.timer == "closed") {
                params.goTo("/moves");
            }
        });
    }
    timer[0].addEventListener("timer", function (e) {
        if ((e.detail.timer == "closed" && currentData.myMove == "") ||
            currentData.opponentMove == "") {
            state_1.state.setStart(false);
            currentData.myMove = "";
            currentData.opponentMove = "";
            params.goTo("/instruction");
        }
        else if ((((e.detail.timer == "closed" && currentData.myMove == "piedra") ||
            "papel" ||
            "tijera") &&
            currentData.opponentMove == "piedra") ||
            "papel" ||
            "tijera") {
            params.goTo("/moves");
        }
    });
    div.classList.add("container");
    div.appendChild(style);
    return div;
}
exports.initPlay = initPlay;
