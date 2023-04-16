"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitPlayer = void 0;
const state_1 = require("../../state");
function waitPlayer(params) {
  const div = document.createElement("div");
  const style = document.createElement("style");
  const bgurl = require(__dirname + "../img/fondohorizontal.png");
  const currentData = state_1.state.getData();
  function goTo() {
    state_1.state.listenRtdb(
      () => {
        params.goTo("/fullRoom");
      },
      () => {
        params.goTo("/instruction");
      },
      () => {
        params.goTo("/compartirSala");
      },
      () => {
        params.goTo("/play");
      }
    );
  }
  let playersOnStart = state_1.state.playersStart();
  playersOnStart
    .then((r) => {
      return r;
    })
    .then((res) => {
      console.log(res, "SOY LA RES DESDE PAGINA WAIT PLAYER");
      if (!currentData.history) {
        state_1.state.getHistory();
      }
      goTo();
    });
  style.innerHTML = `
  .root {
  background-image: url(${bgurl});
  margin: 0px;
}
  .container{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    justify-content: space-between;
}
  
.section__codigo{
  font-family: 'American Typewriter', cursive; 
  font-size:35px;  
  text-align:center;
}

  .hands{
        position: relative;
        bottom: -37px;
}  
`;
  div.innerHTML = `
      
      <div class="container">
         <headerinfo-comp></headerinfo-comp>
         <section class="section">
          <div class="section__codigo">
           <text-comp class="text" type="rootb">Esperando a que ${currentData.opponentName} presione ¡Jugar!...</text-comp>
          </div>
         </section>
         <div class="hands">
           <manos-comp></manos-comp>
         <div>
      </div>
  `;
  div.classList.add("container");
  div.appendChild(style);
  return div;
}
exports.waitPlayer = waitPlayer;
