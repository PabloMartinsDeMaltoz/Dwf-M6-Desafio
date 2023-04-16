"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.starComp = void 0;
function starComp() {
    class star extends HTMLElement {
        constructor() {
            super();
            this.shadow = this.attachShadow({ mode: "open" });
            this.render();
        }
        render() {
            const divEl = document.createElement("div");
            const style = document.createElement("style");
            const type = this.getAttribute("type");
            const starGreen = require("./img/StarGreen.svg");
            const starRed = require("./img/StarRed.svg");
            const StarGray = require("./img/StarGray.svg");
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
            }
            else if (type == "victoria") {
                divEl.innerHTML = `
        <img src=${starGreen.href}> <text-comp type="score" class="text">Ganaste</text-comp></img> `;
            }
            else if (type == "empate") {
                divEl.innerHTML = `
        <img src=${StarGray.href}> <text-comp type="score" class="text">Empate</text-comp></img> `;
            }
            this.shadow.appendChild(style);
            this.shadow.appendChild(divEl);
        }
    }
    customElements.define("star-comp", star);
}
exports.starComp = starComp;
