"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initPageWelcome = void 0;
function initPageWelcome(params) {
    var div = document.createElement("div");
    var style = document.createElement("style");
    var bgurl = new URL("../img/fondohorizontal.png", import.meta.url);
    style.innerHTML = "\n  .root {\n  background-image: url(".concat(bgurl, ");\n  margin: 0px;\n}\n  .container{\n    width: 100%;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    height: 100vh;\n    justify-content: center;\n}\n  .hands{\n        position: absolute;\n        bottom: -37px;\n  }\n   .text{\n     margin-top:74px;\n     width: 300px;\n   }\n  \n  .container-button{\n     margin-top:41px;\n     display:flex;\n     flex-direction: column;\n     gap:20px;    \n    }\n   @media (min-width:769px){\n     .container-button{\n      gap:39px;\n     }\n}\n\n  ");
    div.classList.add(".root");
    div.innerHTML = "\n      <text-comp class=\"text\" type=\"root\">Piedra Papel o Tijera</text-comp>\n      <div class=\"container-button\">\n      <button-comp class=\"boton-newgame\">Nuevo juego</button-comp>\n      <button-comp class=\"boton-goroom\">Ingresar a una sala</button-comp>\n      </div>\n      <div class=\"hands\">\n       <manos-comp ></manos-comp>\n      </div>\n  ";
    div.classList.add("container");
    div.appendChild(style);
    var buttonEl = div.querySelector(".boton-newgame");
    buttonEl.addEventListener("click", function (e) {
        e.preventDefault();
        params.goTo("/newGame");
    });
    var buttonElRoom = div.querySelector(".boton-goroom");
    buttonElRoom.addEventListener("click", function (e) {
        e.preventDefault();
        params.goTo("/connectedRoom");
    });
    return div;
}
exports.initPageWelcome = initPageWelcome;
