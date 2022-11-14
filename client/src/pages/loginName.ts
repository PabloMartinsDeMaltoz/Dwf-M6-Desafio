import { LogError } from "concurrently";
import { state } from "../../state";

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
  const formEl = div.querySelector(".form");
  formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    const target = e.target as any;
    const name = target.name.value;
    state.setName(name, () => {
      state.getRtdb(() => {
        state.listenRtdb(() => {
          state.setPlayer(() => {
            goToCompartirSala();
          });
        });
      });
    });
    function goToCompartirSala() {
      const currentData = state.getData();

      if (currentData.roomFull == false) {
        params.goTo("/compartirSala");
        currentData.roomFull = true;
        state.setData(currentData);
      } else {
        params.goTo("/fullRoom");
      }
    }
  });

  div.classList.add("container");
  div.appendChild(style);

  return div;
}
