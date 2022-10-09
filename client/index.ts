import { initRoute } from "./routes";
import { titleComp } from "./src/components/title/textComp";
import { buttonComp } from "./src/components/button/buttonComp";
import { manosComp } from "./src/components/manos-comp/manosComp";
import { timerComp } from "./src/components/timer/timerComp";
import { scoreComp } from "./src/components/score/score";
import { starComp } from "./src/components/Star/starComp";
import { state } from "./state";

function main() {
  const rootEl: any = document.querySelector(".root");
  state.init();
  titleComp();
  buttonComp();
  manosComp();
  timerComp();
  scoreComp();
  starComp();
  initRoute(rootEl);
}

main();
