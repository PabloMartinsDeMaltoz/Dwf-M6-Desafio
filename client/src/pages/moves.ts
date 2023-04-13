import { json } from "body-parser";
import { state } from "../../state";

export function initMoves(params) {
  const div = document.createElement("div");
  const style = document.createElement("style");
  const bgurl = new URL("../img/fondohorizontal.png", import.meta.url);
  const currentData = state.getData();

  let localStor = JSON.parse(localStorage.getItem("user"));
  console.log(localStor.moves);
  console.log(
    localStor.moves.myMove,
    localStor.moves.opponentMove,
    "ESTAS SON LAS JUGADAS"
  );

  //const result = state.result(localStor.moves);
  style.innerHTML = `
      .root {
    background-image: url(${bgurl});
    margin: 0px;
  }
    .container{
      height: 100vh;
      display: flex;
      align-content: center;
      justify-content: space-between;
      flex-direction: column;
      align-items: center;
    }
    .opponentsPlay{
      position: absolute;
      top: -14px;
      transform: rotate(180deg);
    }
    .myPlay{
      position: absolute;
      bottom: -6px;
      
    }
    `;

  div.innerHTML = `
   
    
     <div class="container" >
        <manos-comp class="opponentsPlay" size="big" type="${localStor.moves.opponentMove}"></manos-comp>
        <manos-comp class="myPlay" size="big" type="${localStor.moves.myMove}" ></manos-comp>
     </div>
   
   
    `;

  state.result(localStor.moves);
  console.log(currentData, "despues del result");
 
  setTimeout(() => {
    params.goTo("/result");
  }, 6000);

  div.appendChild(style);
  return div;
}
