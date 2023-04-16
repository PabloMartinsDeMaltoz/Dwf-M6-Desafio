"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instruction = void 0;
const state_1 = require("../../state");
function instruction(params) {
    const div = document.createElement("div");
    const style = document.createElement("style");
    const bgurl = require("../img/fondohorizontal.png");
    style.innerHTML = `
    .root {
  background-image: url(${bgurl});
  margin: 0px;
}
  .rootb{
    width:100%;
  }
  .container{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    justify-content: center;
   }
   .text{
    margin-bottom: 45px;
    width: 300px;
   }
   .hands{
    position: absolute;
    bottom: -37px;
  }
  .boton{
    margin-bottom: 171px;
  }
  `;
    div.innerHTML = `
  
  <text-comp class="text" type="rootb">Presioná jugar y elegí: piedra, papel o tijera antes de que pasen los 3 segundos</text-comp>
  <button-comp class="boton">Jugar</button-comp>
  <div class="hands">
  <manos-comp ></manos-comp>
  </div>
  `;
    state_1.state.getOpponnetInfo();
    state_1.state.getHistory();
    const buttonEl = div.querySelector(".boton");
    buttonEl.addEventListener("click", (e) => {
        e.preventDefault();
        const currentData = state_1.state.getData();
        state_1.state.setStart(true, () => {
            params.goTo("/wait");
        });
    });
    div.classList.add("container");
    div.appendChild(style);
    return div;
}
exports.instruction = instruction;
