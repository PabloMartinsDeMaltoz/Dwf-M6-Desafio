"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initPageE = void 0;
const state_1 = require("../../state");
function initPageE(params) {
    const div = document.createElement("div");
    const style = document.createElement("style");
    const bgurl = require("../img/fondohorizontal.png");
    const currentData = state_1.state.getData();
    style.innerHTML = `
  .root {
  
}
.rootWin{
      background-color: #888949E5;
}
.rootLose{
      background-color:#894949E5;
}
.rootTie{
      background-color:rgba(127,127,127,0.9);
}
  .rootE{
    height:100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap:20px;
} 
   .text{
     margin-botton:74px;
   }
   .boton-jugar .boton-home{
     margin-top:21px;
   }
     .container{
    display: flex;
    align-content: center;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
  
  }
  .pcPlay{
    position: absolute;
    top: -14px;
     transform: rotate(180deg);
      z-index:-1;
     
  }
  .myPlay{
    position: absolute;
    bottom: -6px;
    z-index:-1;
   
}


  }
  `;
    div.classList.add("root");
    div.innerHTML = `
  
  <div class="rootE">
   <star-comp type="${currentData.result}"></star-comp>
   <score-comp myScore="${currentData.history[currentData.name].score.victorias}" pcScore="${currentData.history[currentData.name].score.perdidas}"></score-comp>
   <button-comp class="boton-jugar">Volver a jugar</button-comp>
   <button-comp class="boton-home">Home</button-comp>
  </div> 
  <div class="container" >
     <manos-comp class="pcPlay" size="big" type="${currentData.opponentMove}"></manos-comp>
     <manos-comp class="myPlay" size="big" type="${currentData.myMove}"></manos-comp>
  </div>
  `;
    console.log("OPPONENT HISTORY");
    console.log(currentData.history[currentData.opponentName].score);
    state_1.state.setHistory({
        [currentData.name]: {
            score: {
                victorias: currentData.history[currentData.name].score.victorias,
                perdidas: currentData.history[currentData.name].score.perdidas,
            },
        },
        [currentData.opponentName]: {
            score: {
                victorias: currentData.history[currentData.opponentName].score.victorias,
                perdidas: currentData.history[currentData.opponentName].score.perdidas,
            },
        },
    });
    state_1.state.setStart(false);
    const botonJugarEl = div.querySelector(".boton-jugar");
    botonJugarEl.addEventListener("click", () => {
        currentData.myMove = "";
        currentData.opponentMove = "";
        state_1.state.setData(currentData);
        state_1.state.playersMoves();
        params.goTo("/instruction");
    });
    const botonHomeEl = div.querySelector(".boton-home");
    botonHomeEl.addEventListener("click", () => {
        currentData.myMove = "";
        currentData.online = "";
        currentData.opponentMove = "";
        state_1.state.rtdbOnlineOff();
        state_1.state.setData(currentData);
        params.goTo("/welcome");
    });
    div.appendChild(style);
    if (currentData.result == "victoria") {
        div.classList.replace("root" || "rootTie" || "rootLose", "rootWin");
    }
    else if (currentData.result == "perdiste") {
        div.classList.replace("root" || "rootTie" || "rootWin", "rootLose");
    }
    else if (currentData.result == "empate") {
        div.classList.replace("root" || "rootWin" || "rootLose", "rootTie");
    }
    return div;
}
exports.initPageE = initPageE;
