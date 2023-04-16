"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scoreComp = void 0;
const state_1 = require("../../../state");
function scoreComp() {
    class score extends HTMLElement {
        constructor() {
            super();
            this.shadow = this.attachShadow({ mode: "open" });
            const div = document.createElement("div");
            const style = document.createElement("style");
            const myScore = this.getAttribute("myScore");
            const pcScore = this.getAttribute("pcScore");
            const currentData = state_1.state.getData();
            style.innerHTML = `
    .root{
       width: 259px;
       border: solid 10px black;
       border-radius: 10px;
       background:white;
    }
    .score{
        text-align:center;
        padding-top:13px;
    }
    .font{
           text-align: end;
           padding-right: 30px;
           padding-top: 11px;
    }
    .results{
        display:flex;
        flex-direction: column;
}
    }
    `;
            div.classList.add("root");
            div.innerHTML = `
      <text-comp class="score" type="score">Score</text-comp>
      <div class="results">
      <text-comp  class="font" type="score">${currentData.name}: ${myScore}</text-comp>
      <text-comp  class="font" type="score">${currentData.opponentName}: ${pcScore}</text-comp>
      </div>
      `;
            this.shadow.appendChild(div);
            this.shadow.appendChild(style);
        }
    }
    customElements.define("score-comp", score);
}
exports.scoreComp = scoreComp;
