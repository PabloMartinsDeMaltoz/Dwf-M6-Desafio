"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initPlay = void 0;
const state_1 = require("../../state");
function initPlay(params) {
  const div = document.createElement("div");
  const style = document.createElement("style");
  const bgurl = require(__dirname + "../img/fondohorizontal.png");
  const currentData = state_1.state.getData();
  style.innerHTML = `
   .root {
  background-image: url(${bgurl});
  margin: 0px;
}
  .rootC{
    width:100%;
  }
  .center{
        padding: 125px 0px;
        width: 100%;
        display: flex;
        justify-content: center;
  }
  .container{
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-content: center;
    align-items: center;
  }
   .container-hands{
    
    display: flex;
    flex-direction: row;
    justify-content: center;
   }
    @media (min-width:769px){
     .container-hands{
      gap:39px;
     }

   .text{
     margin-botton:74px;
   }
     .hands{
       height:200px;
       display:flex;
       bottom: -37px;
  }
  `;
  div.innerHTML = `
  <timer-comp></timer-comp>
  <div class="hands">
   <div class="container-hands">
   <manos-comp size="med" type="tijera"></manos-comp>
   <manos-comp size="med" type="piedra"></manos-comp>
   <manos-comp size="med" type="papel"></manos-comp>
   </div> 
  </div>
  `;
  state_1.state.setMyMove("");
  const opcionElejida = div.getElementsByTagName("manos-comp");
  const timer = div.getElementsByTagName("timer-comp");
  for (const op of opcionElejida) {
    op.addEventListener("click", (e) => {
      let myMove = e.target.getAttribute("type") || "";
      state_1.state.setMyMove(myMove);
      if (state_1.state.timer == "closed") {
        params.goTo("/moves");
      }
    });
  }
  timer[0].addEventListener("timer", (e) => {
    if (
      (e.detail.timer == "closed" && currentData.myMove == "") ||
      currentData.opponentMove == ""
    ) {
      state_1.state.setStart(false);
      currentData.myMove = "";
      currentData.opponentMove = "";
      params.goTo("/instruction");
    } else if (
      (((e.detail.timer == "closed" && currentData.myMove == "piedra") ||
        "papel" ||
        "tijera") &&
        currentData.opponentMove == "piedra") ||
      "papel" ||
      "tijera"
    ) {
      params.goTo("/moves");
    }
  });
  div.classList.add("container");
  div.appendChild(style);
  return div;
}
exports.initPlay = initPlay;
