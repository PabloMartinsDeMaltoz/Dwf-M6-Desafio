import { LogError } from "concurrently";
import { state } from "../../state";
import map from "lodash/map";

export function initPageLoginName(params) {
  const div = document.createElement("div");
  const style = document.createElement("style");
  const bgurl = new URL("../img/fondohorizontal.png", import.meta.url);
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
     margin-top:74px;
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
  function goToCompartirSala() {
    const listenRtdb = state.listenRtdb(
      () => {
        params.goTo("/fullRoom");
      },
      () => {
        params.goTo("/instruction");
      },
      () => {
        params.goTo("/compartirSala");
      }
    );
  }

  async function setNameAndConnectedRoom(name: string) {
    let id = await state.setName(name);
    state.setPlayer();
    let rtdbId = await state.getRtdb();
    goToCompartirSala();
  }
  const formEl = div.querySelector(".form");
  formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    const currentData = state.getData();
    const target = e.target as any;
    const name = target.name.value;
    setNameAndConnectedRoom(name);

    div.classList.add("container");
    div.appendChild(style);
  });
  return div;
}
