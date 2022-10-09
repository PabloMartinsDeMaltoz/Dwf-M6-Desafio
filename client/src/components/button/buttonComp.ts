export function buttonComp() {
  class button extends HTMLElement {
    shadow = this.attachShadow({ mode: "open" });
    constructor() {
      super();
      this.render();
    }
    render() {
      const buttonEl = document.createElement("button");
      const style = document.createElement("style");
      style.innerHTML = `
      .root{
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
      `;
      buttonEl.textContent = this.innerText;
      buttonEl.classList.add("root");
      this.shadow.appendChild(buttonEl);
      this.shadow.appendChild(style);
    }
  }
  customElements.define("button-comp", button);
}
