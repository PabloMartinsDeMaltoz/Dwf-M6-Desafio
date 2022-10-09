export function timerComp() {
  class timer extends HTMLElement {
    shadow = this.attachShadow({ mode: "open" });
    constructor() {
      super();
    }
    connectedCallback() {
      this.render();
    }
    render() {
      const div = document.createElement("div");
      const style = document.createElement("style");
      style.innerHTML = `
      .root{
            width: 243px;
            height: 243px;
            font-family: 'American Typewriter', cursive;
            font-weight: 600;
            font-size: 100px;
            border: 25px solid black;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
       }
      `;
      var number = 4;
      const intervalId = setInterval(() => {
        number--;
        div.innerText = `${number}`;
        if (number == 0) {
          clearInterval(intervalId);
          const nuevoEvento = new CustomEvent("timer", {
            detail: {
              timer: "closed",
            },
          });
          this.dispatchEvent(nuevoEvento);
        }
      }, 1000);
      div.classList.add("root");
      this.classList.add("center");
      this.shadow.appendChild(style);
      this.shadow.appendChild(div);
    }
  }

  customElements.define("timer-comp", timer);
}
