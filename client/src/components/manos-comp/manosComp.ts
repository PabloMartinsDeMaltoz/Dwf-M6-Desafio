import { url } from "inspector";

export function manosComp() {
  class manos extends HTMLElement {
    shadow = this.attachShadow({ mode: "open" });
    constructor() {
      super();
      this.render();
    }
    render() {
      const divEl = document.createElement("div");
      const style = document.createElement("style");
      const type = this.getAttribute("type");
      const size = this.getAttribute("size");

      const imagePapel = require("./img/papel.svg");
      const imagePiedra = require("./img/piedra.svg");
      const imageTijera = require("./img/tijera.svg");
      console.log(imagePapel);

      style.innerHTML = `
      .root{
          width:100%;         
      }
      .small{
        width:70px;
      }
      @media (min-width:769px){
    .small{
      width:79px;
    }
  }
    .med{
      width:121px;
  }
  .big{
    width:150px;
  }
      .papel  {
        width:78px;
      }
       @media (min-width:769px){
         .papel{
            width:93px;
      }
    }
    
    
      .container{
               width: 100%;
               height: 137px;
               display: flex;
               justify-content: space-evenly;
               gap: 20px;
      }
     #tijera:hover{
             animation: moveHand 0.3s 0.1s both;
     }  
     
     #papel:hover{
             animation: moveHand 0.3s 0.1s both;
     }  
     #piedra:hover{
             animation: moveHand 0.3s 0.1s both;
     }      
    @keyframes moveHand {
     0% {
       margin-top: -10px;
     }
     100% {
       margin-top: -50px;
     }
    }
      `;

      divEl.classList.add("root");
      divEl.innerHTML = `
      <div class="container">
      <img class="small" src="${imageTijera}"><img>
      <img class="small" src="${imagePiedra}"><img>
      <img class="small" src="${imagePapel}"><img>
      </div>     
      `;
      if (type == "tijera") {
        divEl.innerHTML = `
          <img id="tijera" class="${size}" src="${imageTijera}"><img>`;
      } else if (type == "piedra") {
        divEl.innerHTML = `
          <img id="piedra"  class="${size}" src="${imagePiedra}"><img>`;
      } else if (type == "papel") {
        divEl.innerHTML = `
          <img id="papel" class="${size}" src="${imagePapel}"><img>`;
      } else if (type == "") {
        divEl.innerHTML = "";
      }

      this.shadow.appendChild(style);
      this.shadow.appendChild(divEl);
    }
  }
  customElements.define("manos-comp", manos);
}
