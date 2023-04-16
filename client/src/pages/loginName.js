"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initPageLoginName = void 0;
const state_1 = require("../../state");
function initPageLoginName(params) {
    const div = document.createElement("div");
    const style = document.createElement("style");
    const bgurl = require("../img/fondohorizontal.png");
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
     margin-top:-40px;
     width: 300px;
   }
  
  .container-button{
     margin-top:41px;
     display:flex;
     flex-direction: column;
     gap:20px;    
    }
    @media (min-width:769px){
      .container-button{
        gap:39px;
      }
    }
    `;
    div.classList.add(".root");
    div.innerHTML = `
  <div class="container">
      <text-comp class="text" type="root">Piedra Papel o Tijera</text-comp>
      <input-comp  type="nombre" class="inputComp"></input-comp>
      <div class="hands">
       <manos-comp ></manos-comp>
      </div>
  </div>
  `;
    function goToCompartirSala() {
        state_1.state.listenRtdb(() => {
            params.goTo("/fullRoom");
        }, () => {
            params.goTo("/instruction");
        }, () => {
            params.goTo("/compartirSala");
        }, () => {
            params.goTo("/play");
        });
    }
    async function setNameAndConnectedRoom(name) {
        let id = await state_1.state.setName(name);
        if (id.name == "") {
            alert("este user no esta disponible");
        }
        else {
            state_1.state.setPlayer();
            let rtdbId = await state_1.state.getRtdb();
            goToCompartirSala();
        }
    }
    const formEl = div.querySelector(".form");
    formEl.addEventListener("submit", (e) => {
        e.preventDefault();
        const currentData = state_1.state.getData();
        const target = e.target;
        const name = target.name.value;
        setNameAndConnectedRoom(name);
    });
    div.classList.add(".container");
    div.appendChild(style);
    return div;
}
exports.initPageLoginName = initPageLoginName;
