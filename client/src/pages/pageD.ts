import { state } from "../../state";
export function initPageD(params) {
  const div = document.createElement("div");
  const style = document.createElement("style");
  const bgurl = new URL("../img/fondohorizontal.png", import.meta.url);
  const moves = state.getData();
  const myplay = moves.myMove;
  const pcplay = moves.pcMove;
  
  const result = state.result(moves);
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
  .pcPlay{
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
      <manos-comp class="pcPlay" size="big" type="${pcplay}"></manos-comp>
      <manos-comp class="myPlay" size="big" type="${myplay}" ></manos-comp>
   </div>
 
 
  `;
  setTimeout(() => {
    params.goTo("/result");
  }, 2000);

  div.appendChild(style);

  return div;
}
