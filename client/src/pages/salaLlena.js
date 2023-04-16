"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initPageFull = void 0;
function initPageFull(params) {
  const div = document.createElement("div");
  const style = document.createElement("style");
  const bgurl = require(__dirname + "../img/fondohorizontal.png");
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
    justify-content: center;
}
  .hands{
        position: absolute;
        bottom: -37px;
  }
   .text{
     width: 300px;
   }
  
  .container-text{
    max-width: 281px;
    margin-top: 41px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    text-align: center;   
    }
   @media (min-width:769px){
     .container-button{
      gap:39px;
     }
}

  `;
  div.classList.add(".root");
  div.innerHTML = `
      <text-comp class="text" type="root">Piedra Papel o Tijera</text-comp>
      <div class="container-text"> <text-comp type="rootb">Ups, esta sala está completa y tu nombre no coincide con nadie en la sala.</text-comp></div>
      

      <div class="hands">
       <manos-comp ></manos-comp>
      </div>
  `;
  div.classList.add("container");
  div.appendChild(style);
  return div;
}
exports.initPageFull = initPageFull;
