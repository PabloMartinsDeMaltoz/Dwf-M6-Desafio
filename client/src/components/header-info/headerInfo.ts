import { state } from "../../../state";

export function headerInfoComp() {
  class headerInfoComp extends HTMLElement {
    constructor() {
      super();

      state.subscribe(() => {
        this.connectedCallback();
      });
    }
    connectedCallback() {
      this.render();
    }
    render() {
      const currentData = state.getData();
      const divEl = document.createElement("div");
      const style = document.createElement("style");
      this.style.width = "100%";
      style.innerHTML = `
      .header{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
    margin-top:31px;
}
  .player1{
    font-family: 'American Typewriter', cursive;
    font-size:24px;
    font-weight:600;
    margin:0px;
}

  .player2{
    font-family: 'American Typewriter', cursive;
    font-size:24px;
    font-weight:600;
    color:#FF6442;
    margin:0px;
}
.room{
    font-family: 'American Typewriter', cursive; 
    font-size:24px;  
    margin:0px;
}
     
     `;
    
      const player1 = currentData.name;
      const player1Victories = currentData.history[currentData.name]
        ? currentData.history[currentData.name].score.victorias
        : 0;
    

      const player2Victories = currentData.history[currentData.opponentName]
        ? currentData.history[currentData.opponentName].score.victorias
        : 0;

      const player2 = currentData.opponentName
        ? currentData.opponentName
        : "offline";

      divEl.innerHTML = `
         <header class="header">
           <div class"header__score">
            <p class="player1">${player1}:${player1Victories}</p>
            <p class="player2">${player2}:${player2Victories}</p>
           </div>
           <div class"header__room">
            <p class="player1">Sala</p>
            <p class="room">${currentData.shortId}</p>
           </div> 
         </header>
     `;
      if (this.firstChild) {
        this.lastChild.remove();
        this.firstChild.remove();
        this.appendChild(divEl);
        this.appendChild(style);
      } else {
        this.appendChild(divEl);
        this.appendChild(style);
      }
    }
  }

  customElements.define("headerinfo-comp", headerInfoComp);
}
