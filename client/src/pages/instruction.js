"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instruction = void 0;
var state_1 = require("../../state");
function instruction(params) {
    var div = document.createElement("div");
    var style = document.createElement("style");
    var bgurl = new URL("../img/fondohorizontal.png", import.meta.url);
    style.innerHTML = "\n    .root {\n  background-image: url(".concat(bgurl, ");\n  margin: 0px;\n}\n  .rootb{\n    width:100%;\n  }\n  .container{\n    width: 100%;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    height: 100vh;\n    justify-content: center;\n   }\n   .text{\n    margin-bottom: 45px;\n    width: 300px;\n   }\n   .hands{\n    position: absolute;\n    bottom: -37px;\n  }\n  .boton{\n    margin-bottom: 171px;\n  }\n  ");
    div.innerHTML = "\n  \n  <text-comp class=\"text\" type=\"rootb\">Presion\u00E1 jugar y eleg\u00ED: piedra, papel o tijera antes de que pasen los 3 segundos</text-comp>\n  <button-comp class=\"boton\">Jugar</button-comp>\n  <div class=\"hands\">\n  <manos-comp ></manos-comp>\n  </div>\n  ";
    state_1.state.getOpponnetInfo();
    state_1.state.getHistory();
    var buttonEl = div.querySelector(".boton");
    buttonEl.addEventListener("click", function (e) {
        e.preventDefault();
        var currentData = state_1.state.getData();
        state_1.state.setStart(true, function () {
            params.goTo("/wait");
        });
    });
    div.classList.add("container");
    div.appendChild(style);
    return div;
}
exports.instruction = instruction;
