export function starComp() {
  class star extends HTMLElement {
    shadow = this.attachShadow({ mode: "open" });
    constructor() {
      super();
      this.render();
    }
    render() {
      const divEl = document.createElement("div");
      const style = document.createElement("style");
      const type = this.getAttribute("type");

      const starGreen = new URL("./img/StarGreen.svg", import.meta.url);
      const starRed = new URL("./img/StarRed.svg", import.meta.url);
      const StarGray = new URL("./img/StarGray.svg", import.meta.url);

      style.innerHTML = `
      
      .text{         
           position: relative;
           top: -173px;
           left: 68px;
           color: white;
     } 
      `;
      divEl.style.height = "272px";
      if (type == "perdiste") {
        divEl.innerHTML = `
        <img src=${starRed.href}><text-comp type="score" class="text">Perdiste</text-comp></img>`;
      } else if (type == "victoria") {
        divEl.innerHTML = `
        <img src=${starGreen.href}> <text-comp type="score" class="text">Ganaste</text-comp></img> `;
      } else if (type == "empate") {
        divEl.innerHTML = `
        <img src=${StarGray.href}> <text-comp type="score" class="text">Empate</text-comp></img> `;
      }
      this.shadow.appendChild(style);
      this.shadow.appendChild(divEl);
    }
  }

  customElements.define("star-comp", star);
}
