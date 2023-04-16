"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initPageFull = void 0;
function initPageFull(params) {
    var div = document.createElement("div");
    var style = document.createElement("style");
    var bgurl = new URL("../img/fondohorizontal.png", import.meta.url);
    style.innerHTML = "\n  .root {\n  background-image: url(".concat(bgurl, ");\n  margin: 0px;\n}\n  .container{\n    width: 100%;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    height: 100vh;\n    justify-content: center;\n}\n  .hands{\n        position: absolute;\n        bottom: -37px;\n  }\n   .text{\n     width: 300px;\n   }\n  \n  .container-text{\n    max-width: 281px;\n    margin-top: 41px;\n    display: flex;\n    flex-direction: column;\n    gap: 20px;\n    text-align: center;   \n    }\n   @media (min-width:769px){\n     .container-button{\n      gap:39px;\n     }\n}\n\n  ");
    div.classList.add(".root");
    div.innerHTML = "\n      <text-comp class=\"text\" type=\"root\">Piedra Papel o Tijera</text-comp>\n      <div class=\"container-text\"> <text-comp type=\"rootb\">Ups, esta sala est\u00E1 completa y tu nombre no coincide con nadie en la sala.</text-comp></div>\n      \n\n      <div class=\"hands\">\n       <manos-comp ></manos-comp>\n      </div>\n  ";
    div.classList.add("container");
    div.appendChild(style);
    return div;
}
exports.initPageFull = initPageFull;
