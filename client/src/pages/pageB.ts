export function initPageB(params) {
  const div = document.createElement("div");
  const style = document.createElement("style");
  const bgurl = new URL("../img/fondohorizontal.png", import.meta.url);
  style.innerHTML = `
    .root {
  background-image: url(${bgurl});
  margin: 0px;
}
  .rootb{
    width:100%;
  }
  .container{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    justify-content: center;
   }
   .text{
    margin-bottom: 45px;
    width: 300px;
   }
   .hands{
    position: absolute;
    bottom: -37px;
  }
  .boton{
    margin-bottom: 171px;
  }
  `;

  div.innerHTML = `
  
     <text-comp class="text" type="rootb">Presioná jugar y elegí: piedra, papel o tijera antes de que pasen los 3 segundos</text-comp>
     <button-comp class="boton">Jugar</button-comp>
      <div class="hands">
       <manos-comp ></manos-comp>
      </div>
  `;
  div.classList.add("container");
  div.appendChild(style);
  const buttonEl:any = div.querySelector(".boton");
  buttonEl.addEventListener("click", (e) => {
    e.preventDefault();
    params.goTo("/play");
  });
  return div;
}
