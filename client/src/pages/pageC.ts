import { state } from "../../state";
export function initPageC(params) {
  const div = document.createElement("div");
  const style = document.createElement("style");
  const bgurl = new URL("../img/fondohorizontal.png", import.meta.url);
  style.innerHTML = `
   .root {
  background-image: url(${bgurl});
  margin: 0px;
}
  .rootC{
    width:100%;
  }
  .center{
        padding: 125px 0px;
        width: 100%;
        display: flex;
        justify-content: center;
  }
   .container{
     width: 100%;
     display: flex;
     justify-content: space-evenly;
   }
   .text{
     margin-botton:74px;
   }
     .hands{
       width: 100%;
       height:200px;
       position: absolute;
       bottom: -37px;
  }
  `;

  div.innerHTML = `
  <timer-comp></timer-comp>
  <div class="hands">
   <div class="container">
   <manos-comp size="med" type="tijera"></manos-comp>
   <manos-comp size="med" type="piedra"></manos-comp>
   <manos-comp size="med" type="papel"></manos-comp>
   </div> 
  </div>
  `;
  state.setMyMove("");
  const opcionElejida = div.getElementsByTagName("manos-comp");
  const timer = div.getElementsByTagName("timer-comp");
  for (const op of opcionElejida) {
    op.addEventListener("click", (e: any) => {
      let myMove = e.target.getAttribute("type") || "";

      state.setMyMove(myMove);
      state.setPcMove();

      if (state.timer == "closed") {
        params.goTo("/moves");
      }
    });
  }
  timer[0].addEventListener("timer", (e: any) => {
    if (e.detail.timer == "closed" && state.data.myMove == "") {
      params.goTo("/instruction");
    } else if (
      (e.detail.timer == "closed" && state.data.myMove == "piedra") ||
      "papel" ||
      "tijera"
    ) {
      params.goTo("/moves");
    }
  });
  div.appendChild(style);

  return div;
}
