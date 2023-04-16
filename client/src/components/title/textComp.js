"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.titleComp = void 0;
function titleComp() {
    class title extends HTMLElement {
        constructor() {
            super();
            this.shadow = this.attachShadow({ mode: "open" });
            this.render();
        }
        render() {
            const divEl = document.createElement("div");
            const style = document.createElement("style");
            const type = this.getAttribute("type");
            style.innerHTML = `
      .root{
          font-family: 'American Typewriter', cursive;
          font-size:80px;
          color: #009048;
          margin: 0;
          line-height: 88.1%
      }
      .rootb{   
          font-family: 'American Typewriter', cursive;
          font-size:40px;
          color: #000000;
          font-weight:200;
          margin: 0;
      }
      .secondary{
        font-family: 'Odibee Sans', cursive;
        font-variant: small-caps;
        font-size:45px;
        margin: 0;
      }
      .score{
        font-family: 'Odibee Sans', cursive;
        font-size:55px;
        margin: 0;
        font-weight: 400;
      }
      
      `;
            const text = this.innerText;
            divEl.innerHTML = `
      <h1>${text}</h1>
      `;
            const h1El = divEl.querySelector("h1");
            if (type == "root" || "") {
                h1El.classList.add("root");
            }
            else if (type == "secondary") {
                h1El.classList.add("secondary");
            }
            else if (type == "rootb") {
                h1El.classList.add("rootb");
            }
            else if (type == "score") {
                h1El.classList.add("score");
            }
            //divEl.style.width = "300px";
            this.shadow.appendChild(divEl);
            this.shadow.appendChild(style);
        }
    }
    customElements.define("text-comp", title);
}
exports.titleComp = titleComp;
