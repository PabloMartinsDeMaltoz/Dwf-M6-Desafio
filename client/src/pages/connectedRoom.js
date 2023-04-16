"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initPageConnectedRoom = void 0;
var state_1 = require("../../state");
function initPageConnectedRoom(params) {
    var div = document.createElement("div");
    var style = document.createElement("style");
    var bgurl = new URL("../img/fondohorizontal.png", import.meta.url);
    style.innerHTML = "\n  .root {\n  background-image: url(".concat(bgurl, ");\n  margin: 0px;\n}\n  .container{\n    width: 100%;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    height: 100vh;\n    justify-content: center;\n}\n  .hands{\n        position: absolute;\n        bottom: -37px;\n  }\n   .text{\n     margin-top:-40px;\n     width: 300px;\n   }\n  \n  .container-button{\n     margin-top:41px;\n     display:flex;\n     flex-direction: column;\n     gap:20px;    \n    }\n   @media (min-width:769px){\n     .container-button{\n      gap:39px;\n     }\n    .root-button{\n             width: 311px;\n             height:87px;\n             border:solid 10px;\n             border-radius:10px;\n             border-color: #001997;\n             font-size:45px;\n             color: #D8FCFC;\n             background:#006CFC ;\n             font-family: 'Odibee Sans', cursive;\n         }  \n}\n\n  ");
    div.classList.add(".root");
    div.innerHTML = "\n  <div class=\"container\">\n      <text-comp class=\"text\" type=\"root\">Piedra Papel o Tijera</text-comp>\n      <input-comp  class=\"inputComp\"></input-comp>\n      <div class=\"hands\">\n       <manos-comp ></manos-comp>\n      </div>\n  </div>\n  ";
    var formEl = div.querySelector(".form");
    formEl.addEventListener("submit", function (e) {
        e.preventDefault();
        var currentData = state_1.state.getData();
        var target = e.target;
        var code = target.name.value;
        currentData.shortId = code;
        state_1.state.setData(currentData);
        state_1.state.getRoom(currentData.shortId, function () {
            params.goTo("/loginName");
        });
    });
    div.classList.add(".container");
    div.appendChild(style);
    return div;
}
exports.initPageConnectedRoom = initPageConnectedRoom;
