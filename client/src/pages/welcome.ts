import { state } from "../../state";
export function initPageWelcome(params) {
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
      <div class="container-button">
      <button-comp class="boton-newgame">Nuevo juego</button-comp>
      <button-comp class="boton-goroom">Ingresar a una sala</button-comp>
      </div>
      <div class="hands">
       <manos-comp ></manos-comp>
      </div>
  `;
  div.classList.add("container");
  div.appendChild(style);
  const buttonEl: any = div.querySelector(".boton-newgame");
  buttonEl.addEventListener("click", (e) => {
    e.preventDefault();
    params.goTo("/newGame");
  });
  const buttonElRoom: any = div.querySelector(".boton-goroom");
  buttonElRoom.addEventListener("click", (e) => {
    e.preventDefault();
    params.goTo("/connectedRoom");
  });
  return div;
}
