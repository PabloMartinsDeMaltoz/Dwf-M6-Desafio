import { state } from "../../state";
export function initPageConnectedRoom(params) {
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
    .root-button{
             width: 311px;
             height:87px;
             border:solid 10px;
             border-radius:10px;
             border-color: #001997;
             font-size:45px;
             color: #D8FCFC;
             background:#006CFC ;
             font-family: 'Odibee Sans', cursive;
         }  
}

  `;
    div.classList.add(".root");
    div.innerHTML = `
  <div class="container">
      <text-comp class="text" type="root">Piedra Papel o Tijera</text-comp>
      <input-comp  class="inputComp"></input-comp>
      <div class="hands">
       <manos-comp ></manos-comp>
      </div>
  </div>
  `;
    const formEl = div.querySelector(".form");
    formEl.addEventListener("submit", (e) => {
        e.preventDefault();
        const currentData = state.getData();
        const target = e.target;
        const code = target.name.value;
        currentData.shortId = code;
        state.setData(currentData);
        state.getRoom(currentData.shortId, () => {
            params.goTo("/loginName");
        });
    });
    div.classList.add(".container");
    div.appendChild(style);
    return div;
}
