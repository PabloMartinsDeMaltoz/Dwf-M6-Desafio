"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compartirSala = void 0;
var state_1 = require("../../state");
function compartirSala(params) {
    var div = document.createElement("div");
    var style = document.createElement("style");
    var bgurl = new URL("../img/fondohorizontal.png", import.meta.url);
    var currentData = state_1.state.getData();
    /* let playersOn = state.playersOnline();
    playersOn
      .then((r) => {
        return r;
      })
      .then((res) => {
        console.log(res);
        state.subscribe(() => {
          if (res.length == 2) {
            console.log("se lleno podemos jugar");
            currentData.roomFull = true;
            state.setData(currentData);
            console.log(currentData);
  
         //   params.goTo("/instruction");
          }
        });
      });
  */
    style.innerHTML = "\n  .root {\n  background-image: url(".concat(bgurl, ");\n  margin: 0px;\n}\n  .container{\n    width: 100%;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    height: 100vh;\n    justify-content: space-between;\n}\n  \n.section__codigo{\n  font-family: 'American Typewriter', cursive; \n  font-size:35px;  \n  text-align:center;\n}\n\n  .hands{\n        position: relative;\n        bottom: -37px;\n  }\n   \n}\n\n  ");
    div.classList.add(".root");
    div.innerHTML = "\n      <div class=\"container\">\n         <headerinfo-comp></headerinfo-comp>\n         <section class=\"section\">\n           <div class=\"section__codigo\">\n            <p>comparti tu codigo</p>\n            <strong>".concat(currentData.shortId, "</strong>\n            <p>con tu contrincante</p>          \n           </div>\n         </section>\n         <div class=\"hands\">\n           <manos-comp></manos-comp>\n         <div>\n      </div>\n  ");
    div.classList.add("container");
    div.appendChild(style);
    return div;
}
exports.compartirSala = compartirSala;
