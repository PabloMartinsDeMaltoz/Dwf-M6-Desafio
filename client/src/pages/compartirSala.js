"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compartirSala = void 0;
const state_1 = require("../../state");
function compartirSala(params) {
  const div = document.createElement("div");
  const style = document.createElement("style");
  const bgurl = require(__dirname + "../img/fondohorizontal.png");
  const currentData = state_1.state.getData();
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
   
}

  `;
  div.classList.add(".root");
  div.innerHTML = `
      <div class="container">
         <headerinfo-comp></headerinfo-comp>
         <section class="section">
           <div class="section__codigo">
            <p>comparti tu codigo</p>
            <strong>${currentData.shortId}</strong>
            <p>con tu contrincante</p>          
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
exports.compartirSala = compartirSala;
