import { state } from "../../../state";
import map from "lodash/map";
import filter from "lodash/filter";
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
      let player1 = "offline";
      let player1Victories = 0;
      let player2 = "offline";
      let player2Victories = 0;
      let currentGame2 = currentData.rtdbData.currentGame;

      if (Object.values(currentGame2).length < 2) {
        console.log("entre");

        const Player1Data = filter(currentGame2, (e) => {
          return e.name == currentData.name;
        });
        console.log(Player1Data);
        console.log(map(Player1Data).name);

        player1 = Player1Data[0].name;
        player1Victories = Player1Data[0].hystory.victorias;
        console.log(Player1Data);
      } else {
        const Player1Data = filter(currentGame2, (e) => {
          return e.name == currentData.name;
        });
        const Player2Data = filter(currentGame2, (e) => {
          return e.name !== currentData.name;
        });
        player1 = Player1Data[0].name;
        player1Victories = Player1Data[0].hystory.victorias;

        player2 = Player2Data[0].name;
        player2Victories = Player2Data[0].hystory.victorias;
      }

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
