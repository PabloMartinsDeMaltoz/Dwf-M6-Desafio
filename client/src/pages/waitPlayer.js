"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitPlayer = void 0;
var state_1 = require("../../state");
function waitPlayer(params) {
    var div = document.createElement("div");
    var style = document.createElement("style");
    var bgurl = new URL("../img/fondohorizontal.png", import.meta.url);
    var currentData = state_1.state.getData();
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
    var playersOnStart = state_1.state.playersStart();
    playersOnStart
        .then(function (r) {
        return r;
    })
        .then(function (res) {
        console.log(res, "SOY LA RES DESDE PAGINA WAIT PLAYER");
        if (!currentData.history) {
            state_1.state.getHistory();
        }
        goTo();
    });
    style.innerHTML = "\n  .root {\n  background-image: url(".concat(bgurl, ");\n  margin: 0px;\n}\n  .container{\n    width: 100%;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    height: 100vh;\n    justify-content: space-between;\n}\n  \n.section__codigo{\n  font-family: 'American Typewriter', cursive; \n  font-size:35px;  \n  text-align:center;\n}\n\n  .hands{\n        position: relative;\n        bottom: -37px;\n}  \n");
    div.innerHTML = "\n      \n      <div class=\"container\">\n         <headerinfo-comp></headerinfo-comp>\n         <section class=\"section\">\n          <div class=\"section__codigo\">\n           <text-comp class=\"text\" type=\"rootb\">Esperando a que ".concat(currentData.opponentName, " presione \u00A1Jugar!...</text-comp>\n          </div>\n         </section>\n         <div class=\"hands\">\n           <manos-comp></manos-comp>\n         <div>\n      </div>\n  ");
    div.classList.add("container");
    div.appendChild(style);
    return div;
}
exports.waitPlayer = waitPlayer;
