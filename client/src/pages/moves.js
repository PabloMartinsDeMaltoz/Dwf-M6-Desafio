"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initMoves = void 0;
const state_1 = require("../../state");
function initMoves(params) {
    const div = document.createElement("div");
    const style = document.createElement("style");
    const bgurl = require("../img/fondohorizontal.png");
    const currentData = state_1.state.getData();
    let localStor = JSON.parse(localStorage.getItem("user"));
    console.log(localStor.moves);
    console.log(localStor.moves.myMove, localStor.moves.opponentMove, "ESTAS SON LAS JUGADAS");
    //const result = state.result(localStor.moves);
    style.innerHTML = `
      .root {
    background-image: url(${bgurl});
    margin: 0px;
  }
    .container{
      height: 100vh;
      display: flex;
      align-content: center;
      justify-content: space-between;
      flex-direction: column;
      align-items: center;
    }
    .opponentsPlay{
      position: absolute;
      top: -14px;
      transform: rotate(180deg);
    }
    .myPlay{
      position: absolute;
      bottom: -6px;
      
    }
    `;
    div.innerHTML = `
   
    
     <div class="container" >
        <manos-comp class="opponentsPlay" size="big" type="${localStor.moves.opponentMove}"></manos-comp>
        <manos-comp class="myPlay" size="big" type="${localStor.moves.myMove}" ></manos-comp>
     </div>
   
   
    `;
    state_1.state.result(localStor.moves);
    console.log(currentData, "despues del result");
    setTimeout(() => {
        params.goTo("/result");
    }, 6000);
    div.appendChild(style);
    return div;
}
exports.initMoves = initMoves;
