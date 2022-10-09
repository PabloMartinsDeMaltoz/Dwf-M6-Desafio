export function scoreComp() {
  class score extends HTMLElement {
    shadow = this.attachShadow({ mode: "open" });
    constructor() {
      super();
      const div = document.createElement("div");
      const style = document.createElement("style");
      const myScore = this.getAttribute("myScore");
      const pcScore = this.getAttribute("pcScore");
      style.innerHTML = `
    .root{
       width: 259px;
       height: 217px;
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
      <text-comp  class="font" type="score">Vos: ${myScore}</text-comp>
      <text-comp  class="font" type="score">Maquina: ${pcScore}</text-comp>
      </div>
      `;

      this.shadow.appendChild(div);
      this.shadow.appendChild(style);
    }
    
  }
  customElements.define("score-comp", score);
}
