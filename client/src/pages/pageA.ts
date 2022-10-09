import { state } from "../../state";
export function initPageA(params) {
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
   .boton{
     margin-top:74px;
     margin-bottom:86px;
   }
   @media (min-width:769px){
    .boton{
      margin-top:41px;
    }
}

  `;
  div.classList.add(".root");
  div.innerHTML = `
      <text-comp class="text" type="root">Piedra Papel o Tijera</text-comp>
      <button-comp class="boton" >Empezar</button-comp>
      <div class="hands">
       <manos-comp ></manos-comp>
      </div>
  `;
  div.classList.add("container");
  div.appendChild(style);
  const buttonEl: any = div.querySelector(".boton");
  buttonEl.addEventListener("click", (e) => {
    e.preventDefault();
    params.goTo("/instruction");
  });
  return div;
}
