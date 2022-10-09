import { state } from "../../state";
export function initPageE(params) {
  const div = document.createElement("div");
  const style = document.createElement("style");
  const bgurl = new URL("../img/fondohorizontal.png", import.meta.url);
  const data = state.getData();

  style.innerHTML = `
  .root {
  
}
.rootWin{
      background-color: #888949E5;
}
.rootLose{
      background-color:#894949E5;
}
.rootTie{
      background-color:rgba(127,127,127,0.9);
}
  .rootE{
    height:100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
} 
   .text{
     margin-botton:74px;
   }
   .boton{
     margin-top:21px;
   }
     .container{
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
      z-index:-1;
     
  }
  .myPlay{
    position: absolute;
    bottom: -6px;
    z-index:-1;
   
}


  }
  `;
  div.classList.add("root");
  div.innerHTML = `
  
  <div class="rootE">
   <star-comp type="${state.data.currentGame}"></star-comp>
   <score-comp myScore="${state.data.history.victorias}" pcScore="${state.data.history.perdidas}"></score-comp>
   <button-comp class="boton">Volver a jugar</button-comp>
  </div> 
  <div class="container" >
     <manos-comp class="pcPlay" size="big" type="${state.data.pcMove}"></manos-comp>
     <manos-comp class="myPlay" size="big" type="${state.data.myMove}"></manos-comp>
  </div>
  `;

  const botonEl: any = div.querySelector(".boton");
  botonEl.addEventListener("click", () => {
    params.goTo("/instruction");
  });

  div.appendChild(style);

  if (data.currentGame == "victoria") {
    div.classList.replace("root" || "rootTie" || "rootLose", "rootWin");
  } else if (data.currentGame == "perdiste") {
    div.classList.replace("root" || "rootTie" || "rootWin", "rootLose");
  } else if (data.currentGame == "empate") {
    div.classList.replace("root" || "rootWin" || "rootLose", "rootTie");
  }

  return div;
}
