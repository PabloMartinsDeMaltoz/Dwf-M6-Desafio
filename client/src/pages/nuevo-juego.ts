import { async } from "@firebase/util";
import { LogError } from "concurrently";
import { limitToFirst } from "firebase/database";
import { state } from "../../state";
export function initPageNewGame(params) {
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
     margin-top:-40px;;
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
      <text-comp class="text" type="root">Piedra Papel o Tijera</text-comp>
      <input-comp  type="nombre" class="inputComp"></input-comp>
      <div class="hands">
       <manos-comp ></manos-comp>
      </div>
  `;
  function goTo() {
    state.listenRtdb(
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

  async function setNameRoom(name: string) {
    let id = await state.setName(name);
    if (id.name == "") {
      alert("este user no esta disponible");
    } else {
      let shortId = await state.newRoom();
      let rtdbId = await state.getRtdb();
      state.getHistory();
      goTo();
    }
  }
  const formEl = div.querySelector(".form");
  formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    const target = e.target as any;
    const name = target.name.value;
    setNameRoom(name);
  });

  div.classList.add("container");
  div.appendChild(style);

  return div;
}
